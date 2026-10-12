
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet as WalletIcon,
  Copy,
  Check,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Zap,
  Clock,
  AlertCircle,
} from "lucide-react";

const Wallet = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0.0000");
  const [network, setNetwork] = useState("Not connected");
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);

  const isConnected = Boolean(account);

  const shortenAddress = (address) =>
    address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : "";

  const getNetworkName = async (chainId) => {
    const networks = {
      "0x1": "Ethereum Mainnet",
      "0xaa36a7": "Sepolia Testnet",
      "0x89": "Polygon",
      "0x13882": "Polygon Amoy Testnet",
      "0x38": "BNB Smart Chain",
      "0x2105": "Base",
    };

    return networks[chainId] || `Network (${chainId})`;
  };

  const refreshWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Install MetaMask to connect your wallet.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (!accounts.length) {
        setAccount("");
        setBalance("0.0000");
        setNetwork("Not connected");
        return;
      }

      setAccount(accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setNetwork(await getNetworkName(chainId));

      const rawBalance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });

      const wei = BigInt(rawBalance);
      const whole = wei / 10n ** 18n;
      const fraction = wei % 10n ** 18n;

      setBalance(
        `${whole}.${fraction.toString().padStart(18, "0").slice(0, 4)}`
      );

      setError("");
    } catch (err) {
      setError(err.message || "Unable to load wallet information.");
    }
  };

  useEffect(() => {
    refreshWallet();

    if (!window.ethereum) return undefined;

    const handleAccountsChanged = () => refreshWallet();
    const handleChainChanged = () => refreshWallet();

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
      window.ethereum.removeListener(
        "chainChanged",
        handleChainChanged
      );
    };
  }, []);

  const connectWallet = async () => {
    setError("");

    if (!window.ethereum) {
      setError("MetaMask is not installed. Install it from metamask.io.");
      return;
    }

    setConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts.length) {
        setError("No wallet account was selected.");
        return;
      }

      setAccount(accounts[0]);
      await refreshWallet();
    } catch (err) {
      if (err.code === 4001) {
        setError("Wallet connection was rejected.");
      } else {
        setError(err.message || "Unable to connect wallet.");
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    // MetaMask does not provide a standard programmatic disconnect.
    // This clears the connection from this page only.
    setAccount("");
    setBalance("0.0000");
    setNetwork("Not connected");
    setError("");
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Unable to copy address. Please copy it manually.");
    }
  };

  const openExplorer = () => {
    const explorers = {
      "Ethereum Mainnet": "https://etherscan.io/address/",
      "Sepolia Testnet": "https://sepolia.etherscan.io/address/",
      Polygon: "https://polygonscan.com/address/",
      "Polygon Amoy Testnet": "https://amoy.polygonscan.com/address/",
      "BNB Smart Chain": "https://bscscan.com/address/",
      Base: "https://basescan.org/address/",
    };

    const explorer = explorers[network];

    if (explorer && account) {
      window.open(
        `${explorer}${account}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      setError("Explorer link is unavailable for this network.");
    }
  };

  return (
    <main className="p-4 min-h-full w-full text-white bg-[#08080A] sm:p-6 lg:p-8">
      {/* Header */}
      <section className="overflow-hidden relative p-6 bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] rounded-[28px] border-white/[0.07] border sm:p-9">
        <div className="absolute h-52 w-52 bg-[#A259FF]/10 rounded-full blur-[80px] pointer-events-none -right-12 -top-16" />

        <div className="z-10 relative">
          <p className="text-xs font-bold tracking-[0.22em] text-[#A259FF] uppercase">
            Nifty Verse
          </p>

          <h1 className="mt-3 text-3xl font-bold text-transparent bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text sm:text-4xl">
            My Wallet
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92909D] sm:text-base">
            Manage your crypto wallet, check your balance and
            monitor your wallet connection.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm bg-black/20 rounded-full border-white/[0.08] border">
            <span
              className={`h-2 w-2 rounded-full ${
                isConnected ? "bg-emerald-400" : "bg-[#777782]"
              }`}
            />
            <span className={isConnected ? "text-emerald-400" : "text-[#92909D]"}>
              {isConnected ? "Wallet Connected" : "Wallet Not Connected"}
            </span>
          </div>
        </div>
      </section>

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-3 mt-5 p-4 text-sm text-red-300 bg-red-500/[0.06] rounded-xl border-red-500/20 border">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Main wallet cards */}
      <section className="grid grid-cols-1 gap-5 mt-8 xl:grid-cols-3">
        {/* Balance Card */}
        <div className="overflow-hidden relative p-6 bg-gradient-to-br from-[#20132F] via-[#15111D] to-[#101012] rounded-2xl border-[#A259FF]/20 border sm:p-7 xl:col-span-2">
          <div className="absolute h-44 w-44 bg-[#A259FF]/10 rounded-full blur-[70px] pointer-events-none -right-10 -top-10" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-12 w-12 bg-[#A259FF]/10 rounded-xl border-[#A259FF]/20 border">
                  <WalletIcon size={23} className="text-[#C084FC]" />
                </div>

                <div>
                  <h2 className="font-semibold">Wallet Balance</h2>
                  <p className="mt-1 text-xs text-[#92909D]">
                    Native token balance
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={refreshWallet}
                title="Refresh balance"
                className="flex items-center justify-center h-10 w-10 text-[#B872FF] rounded-xl border-white/[0.08] border transition hover:bg-white/[0.05]"
              >
                <RefreshCw size={17} />
              </button>
            </div>

            <div className="mt-8">
              <p className="text-sm text-[#92909D]">Available balance</p>

              <h3 className="mt-2 break-words text-3xl font-bold sm:text-4xl">
                {balance}{" "}
                <span className="text-xl text-[#C084FC]">ETH</span>
              </h3>

              <p className="mt-3 text-xs leading-5 text-[#777782]">
                ETH is shown as the balance unit only when using this
                page's current implementation. The wallet's actual network
                determines the token being measured.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-7">
              {!isConnected ? (
                <button
                  type="button"
                  onClick={connectWallet}
                  disabled={connecting}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <WalletIcon size={17} />
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-xl transition hover:opacity-90"
                  >
                    {copied ? <Check size={17} /> : <Copy size={17} />}
                    {copied ? "Copied!" : "Copy Address"}
                  </button>

                  <button
                    type="button"
                    onClick={disconnectWallet}
                    className="px-5 py-3 text-sm font-medium text-[#D1CED9] rounded-xl border-white/[0.10] border transition hover:bg-white/[0.05]"
                  >
                    Disconnect from Page
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Network Card */}
        <div className="p-6 bg-[#111114] rounded-2xl border-white/[0.07] border sm:p-7">
          <div className="flex items-center justify-center h-12 w-12 bg-emerald-500/10 rounded-xl border-emerald-500/20 border">
            <ShieldCheck size={23} className="text-emerald-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold">Network Details</h2>

          <p className="mt-2 text-sm text-[#92909D]">
            Current wallet network
          </p>

          <div className="mt-5 p-4 bg-[#0B0B0D] rounded-xl border-white/[0.07] border">
            <p className="text-xs text-[#777782]">Network</p>
            <p className="mt-2 break-words text-sm font-semibold text-white">
              {network}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-[#92909D]">
            <Zap size={15} className="text-[#C084FC]" />
            <span>
              {isConnected
                ? "Wallet provider detected"
                : "Connect a wallet to continue"}
            </span>
          </div>
        </div>
      </section>

      {/* Wallet Address */}
      <section className="mt-6 p-5 bg-[#111114] rounded-2xl border-white/[0.07] border sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-11 w-11 bg-[#A259FF]/10 rounded-xl border-[#A259FF]/20 border">
            <WalletIcon size={20} className="text-[#B872FF]" />
          </div>

          <div>
            <h2 className="font-semibold">Wallet Address</h2>
            <p className="mt-1 text-xs text-[#777782]">
              Your connected public address
            </p>
          </div>
        </div>

        {isConnected ? (
          <div className="flex flex-col items-center gap-3 mt-5 sm:flex-row">
            <p className="flex-1 p-4 min-w-0 break-all font-mono text-sm text-[#C8C6D0] bg-[#0B0B0D] rounded-xl border-white/[0.07] border">
              {account}
            </p>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyAddress}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm text-[#C8C6D0] rounded-xl border-white/[0.08] border hover:bg-white/[0.05]"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                Copy
              </button>

              <button
                type="button"
                onClick={openExplorer}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm text-[#C8C6D0] rounded-xl border-white/[0.08] border hover:bg-white/[0.05]"
              >
                <ExternalLink size={16} />
                Explorer
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 p-5 text-sm text-[#92909D] bg-[#0B0B0D] rounded-xl border-dashed border-white/[0.10] border">
            No wallet connected. Connect MetaMask to display your address.
          </div>
        )}
      </section>

      {/* Transactions */}
      <section className="mt-8">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div>
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="mt-1 text-sm text-[#777782]">
              Your latest wallet activity.
            </p>
          </div>

          <span className="px-3 py-2 text-xs text-[#92909D] bg-[#111114] rounded-full border-white/[0.07] border">
            {transactions.length} Transactions
          </span>
        </div>

        {transactions.length > 0 ? (
          <div className="mt-5 space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 p-4 bg-[#111114] rounded-2xl border-white/[0.07] border"
              >
                <div className="flex items-center justify-center h-11 w-11 bg-white/[0.03] rounded-xl border-white/[0.08] shrink-0 border">
                  {transaction.direction === "in" ? (
                    <ArrowDownLeft className="text-emerald-400" size={21} />
                  ) : (
                    <ArrowUpRight className="text-[#B872FF]" size={21} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">
                    {transaction.title}
                  </p>
                  <p className="mt-1 text-xs text-[#777782]">
                    {formatTransactionDate(transaction.date)}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  {transaction.amount} ETH
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-5 px-5 py-10 min-h-[220px] text-center bg-[#101012] rounded-2xl border-dashed border-white/[0.10] border">
            <div className="flex items-center justify-center h-14 w-14 bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
              <Clock size={26} className="text-[#B872FF]" />
            </div>

            <h3 className="mt-4 text-lg font-semibold">
              No transactions yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#85818F]">
              Transactions will appear here once transaction history
              is connected to your wallet or backend.
            </p>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 mt-5 px-5 py-3 text-sm text-white rounded-xl border-white/[0.10] border transition hover:border-[#A259FF]/40 hover:bg-[#A259FF]/[0.06]"
            >
              Explore Marketplace
              <ExternalLink size={15} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

const formatTransactionDate = (date) => {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "Date unavailable"
    : parsed.toLocaleString("en-IN");
};

export default Wallet;
