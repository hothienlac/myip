"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function IpDisplay() {
  const [ip, setIp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchIp = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsRefreshing(true);
      const response = await fetch("/api/ip");

      if (!response.ok) {
        throw new Error("Failed to fetch IP address");
      }

      const data = await response.json();
      setIp(data.ip);
    } catch (err) {
      setError("Could not retrieve your IP address");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  // Format IP address with segments
  const formatIp = (ip: string) => {
    if (ip.includes(":")) {
      // IPv6
      return ip.split(":").map((segment, i) => (
        <span key={i} className="inline-block">
          {segment}
          {i < ip.split(":").length - 1 && (
            <span className="text-slate-400 mx-0.5">:</span>
          )}
        </span>
      ));
    } else {
      // IPv4
      return ip.split(".").map((segment, i) => (
        <span key={i} className="inline-block">
          {segment}
          {i < 3 && <span className="text-slate-400 mx-0.5">.</span>}
        </span>
      ));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden backdrop-blur-sm bg-white/80 border-slate-200/50 shadow-xl">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2" />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <RefreshCw className="h-10 w-10 text-slate-300" />
              </motion.div>
              <p className="mt-6 text-slate-500 font-medium">
                Detecting your IP address...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16 px-6">
              <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-red-500 font-medium mb-4">{error}</p>
              <Button
                onClick={fetchIp}
                variant="outline"
                className="mt-2 border-slate-200"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10 px-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full opacity-10 blur-xl"></div>
                <div className="relative bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-sm">
                  <Wifi className="h-10 w-10 text-slate-700" />
                </div>
              </div>

              <h2 className="text-sm uppercase tracking-wider text-slate-500 mb-3 font-medium">
                Your IP Address
              </h2>

              <motion.div
                className="text-2xl font-mono font-bold text-center mb-6 text-slate-800 bg-slate-50 py-4 px-6 rounded-lg border border-slate-100 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                key={ip}
              >
                {formatIp(ip)}
              </motion.div>

              <Button
                onClick={fetchIp}
                variant="default"
                className="mt-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 transition-all duration-300 shadow-md"
                disabled={isRefreshing}
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  className="mr-2"
                >
                  <RefreshCw className="h-4 w-4" />
                </motion.div>
                Refresh
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
