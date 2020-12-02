#!/bin/bash

set -e

function main {
    setup

    case "${1}" in
        anj)
            acceptanceTests ${@}
        ;;
        acc|acceptance)
            yarnBuild
            jarBuild
            acceptanceTests ${@}
        ;;
        unit)
            unitTests
        ;;
        *)
            yarnBuild
            unitTests
            jarBuild
            acceptanceTests
        ;;
    esac
}

# Tests
function acceptanceTests {
    showBanner "Acceptance Tests"

    SPECIFIC_TESTS=""

    if [[ "${2}" != "" ]]; then
        if [[ $(find ${BASE_DIR}/acceptance/tests/*${2}*) ]]; then
            SPECIFIC_TESTS=$(find ${BASE_DIR}/acceptance/tests/*${2}*)
        fi
    fi

    java -jar -Dspring.profiles.active=test ${BASE_DIR}/target/magpie-[0-9\.]*-SNAPSHOT.jar --server.port=9090 &> ${BASE_DIR}/tmp/acceptance.log &
    echo $! > ${BASE_DIR}/tmp/magpie.pid

    testConnection ${REACT_APP_HOST} $(cat ${BASE_DIR}/tmp/magpie.pid)

    pushd ${BASE_DIR}/acceptance
        yarn install
        if [[ "${PIE_CI}" && "$(lsb_release -crid | grep -i 'Ubuntu')" ]]; then
            xvfb-run yarn codeceptjs run -o "{\"helpers\": {\"Puppeteer\": {\"url\": \"${REACT_APP_HOST}\", \"chrome\": {\"args\": [\"--headless\", \"--no-sandbox\"]}}}}" ${SPECIFIC_TESTS}
        else
            yarn codeceptjs run -o "{ \"helpers\": {\"Puppeteer\": {\"url\": \"${REACT_APP_HOST}\"}}}" ${SPECIFIC_TESTS}
        fi

        if [[ "${?}" == "1" ]]; then
            echo "Acceptance Tests Failed... Exiting"
            exit 1
        fi
    popd
}

function unitTests {
    showBanner "Unit Tests"

#    showBanner "Backend"
#    pushd ${BASE_DIR}
#        if [[ $(mvn test | grep -E "\[INFO\]|\[ERROR\]|Expected" | grep "\[ERROR\]" | wc -l) -gt 0 ]]; then
#            echo "Unit Tests Failed... Exiting"
#            exit 1
#        fi
#    popd

#   changed to show mvn test results regardless, so we get a little more troubleshooting help when Jenkins fails
    showBanner "Backend"
    pushd ${BASE_DIR}
        mvn -q -Dspring.profiles.active=test test
    popd

    showBanner "Frontend"
    pushd ${BASE_DIR}/client
        CI=true yarn test
    popd
}

function cleanup {
    showBanner "Cleanup"
    if [[ -f ${BASE_DIR}/tmp/magpie.pid ]]; then
        cat ${BASE_DIR}/tmp/magpie.pid | xargs kill -9
        rm ${BASE_DIR}/tmp/magpie.pid
    fi
}
trap cleanup EXIT

function jarBuild {
    showBanner "Build JAR"
    pushd ${BASE_DIR}
        mvn -q -Dmaven.test.skip=true -DskipTests -Dflyway.user=${PIE_DB_USERNAME} -Dflyway.password= -Dflyway.url=${PIE_DB_URL} clean flyway:migrate package
    popd
}

function setup {
    showBanner "Setup"

    BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"
    source "${BASE_DIR}/scripts/setup_env.sh"
    REACT_APP_HOST=http://localhost:9090

    mkdir -p ${BASE_DIR}/tmp
}

function yarnBuild {
    pushd ${BASE_DIR}/client
        yarn install
        yarn build
    popd
}

function showBanner {
    echo "======================================================"
    echo "  ${1} ($(date))"
    echo "======================================================"
}

function testConnection {
    COUNTER=0
    echo "Attempting to connect to ${1} (PID: ${2})..."
    until curl --insecure $1 &>/dev/null; do
        sleep 1
        let COUNTER+=1

        if [[ "$COUNTER" -gt 40 ]]
        then
            echo "Could not connect to ${1} (PID: ${2}) after 40 seconds. Exiting..."
            exit 1
        fi

        if [[ $(( $COUNTER % 5 )) -eq 0 ]]
        then
            echo "Attempting to connect to the app server..."
        fi
    done
}

main ${@}
