import { useState, useCallback } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): {copiedValue:CopiedValue, copy:CopyFn} {
  const [copiedValue, setCopiedValue] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not supported, falling back to execCommand');
      return fallbackCopyToClipboard(text);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      return true;
    } catch (error) {
      console.error('Failed to copy text using Clipboard API', error);
      return fallbackCopyToClipboard(text);
    }
  }, []);

  // Fallback method for older browsers (e.g., older Safari versions)
  const fallbackCopyToClipboard = (text: string): boolean => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Hide the element
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopiedValue(text);
      } else {
        console.error('Fallback document.execCommand("copy") failed');
      }
      return successful;
    } catch (error) {
      console.error('Failed to copy text using fallback method', error);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return {copiedValue, copy};
}
