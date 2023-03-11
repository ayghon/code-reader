import { BarCodeScanningResult } from 'expo-camera';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type CodeContextState = {
  code?: BarCodeScanningResult['data'];
  setCode: Dispatch<SetStateAction<BarCodeScanningResult['data'] | undefined>>;
};

const useProvideCode = () => {
  const [code, setCode] = useState<BarCodeScanningResult['data']>();

  return { code, setCode };
};

const CodeContext = createContext<CodeContextState>({ setCode: () => null });

export function CodeProvider({ children }: { children: ReactNode }) {
  const value = useProvideCode();

  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
}

export const useCodeState = () => {
  const context = useContext(CodeContext);

  if (!context) {
    throw new Error('Missing provider for code.context');
  }

  return context;
};
