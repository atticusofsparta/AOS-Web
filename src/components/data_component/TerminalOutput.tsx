import TerminalEmptyState from "../empty_states/TerminalEmptyState";
import { InputTerminal } from "../Terminals";
import TerminalIcon from "../icons/TerminalIcon";
import NewProcessConnectedToast from "../modals/NewProcessConnectedToast";

interface TerminalContainerProps {
  mode: "starter" | "process";
  processId: string | undefined;
  setCreateModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userCommand: string;
  userCommandResult: any;
}

export default function TerminalOutput({
  mode,
  processId,
  setCreateModelOpen,
  setConnectModelOpen,
  userCommand,
  userCommandResult,
}: TerminalContainerProps) {
  return (
    <div className="flex flex-col gap-2 flex-grow overflow-y-auto overflow-x-hidden min-h-0 relative">
      {processId && <NewProcessConnectedToast processId={processId} />}
      <div className="flex gap-1.5 items-center text-xs uppercase">
        <TerminalIcon />
        <span>Terminal</span>
      </div>
      {mode === "starter" ? (
        <TerminalEmptyState
          showCreateModal={setCreateModelOpen}
          showConnectModal={setConnectModelOpen}
        />
      ) : mode === "process" ? (
        <InputTerminal
          userCommand={userCommand}
          userCommandResult={userCommandResult}
        />
      ) : (
        ""
      )}
    </div>
  );
}
