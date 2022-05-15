import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../contexts/GlobalProvider";
import { useBlocker } from "./useBlocker";

export default function useRouterPrompt({ title, message, cancelText = 'Cancel', confirmText = 'Confirm' }, when = false) {
    const { showConfirmDialog, hideConfirmDialog } = useGlobal()
    const [confirmedNavigation, setConfirmedNavigation] = useState(false)

    const retryFn = useRef(() => {})

    useEffect(() => {
        if (confirmedNavigation) {
          retryFn.current()
        }
      }, [confirmedNavigation])

    const handleBlockNavigation = ({ retry }) => {
        if (when) {
            showConfirmDialog({
                title,
                message,
                cancelText,
                confirmText,
                onCancel: hideConfirmDialog,
                onConfirm: () => {
                    setConfirmedNavigation(true)
                    retryFn.current = retry
                    hideConfirmDialog()
                }
            })
        } else {
          retry()
        }
    }

    useBlocker(handleBlockNavigation, !confirmedNavigation)
}