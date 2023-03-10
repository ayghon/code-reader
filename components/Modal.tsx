import { Button, IModalProps, Modal as NBModal } from 'native-base';
import { FC } from 'react';

export const Modal: FC<
  IModalProps & { footerButtons?: JSX.Element | JSX.Element[]; title: string }
> = ({ isOpen, footerButtons, title, children, ...props }) => {
  return (
    <NBModal isOpen={isOpen} {...props}>
      <NBModal.Content>
        <NBModal.CloseButton />
        <NBModal.Header>{title}</NBModal.Header>
        <NBModal.Body>{children}</NBModal.Body>
        {footerButtons && (
          <NBModal.Footer>
            <Button.Group space={2}>{footerButtons}</Button.Group>
          </NBModal.Footer>
        )}
      </NBModal.Content>
    </NBModal>
  );
};
