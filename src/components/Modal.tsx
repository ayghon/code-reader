import { FC, PropsWithChildren } from 'react';
import { Modal as RNPModal, ModalProps, Portal } from 'react-native-paper';

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, ...props }) => {
  return (
    <Portal>
      <RNPModal {...props}>{children}</RNPModal>
    </Portal>
  );
};
