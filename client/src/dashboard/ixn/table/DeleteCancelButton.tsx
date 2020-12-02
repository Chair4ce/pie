import * as React from 'react';
import TextTooltip from '../../components/TextTooltip';

interface DeleteButtonProps {
  handleClick: () => void;
  title: string;
  buttonClassName: string;
  className?: string;
}

export const DeleteCancelButton: React.FC<DeleteButtonProps> = (props) => {

  return (
    <div className={props.className}
         onClick={props.handleClick}
         style={{width: '62px !important'}}
    >
      <TextTooltip title={props.title}>
        <div className={props.buttonClassName}>
          {props.children}
        </div>
      </TextTooltip>
    </div>
  );
};
