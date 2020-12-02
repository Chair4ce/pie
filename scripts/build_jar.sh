#! /bin/bash
set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
   mvn -Dflyway.user=${PIE_DB_USERNAME} -Dflyway.password= -Dflyway.url=${PIE_DB_URL} clean flyway:migrate package
popd
