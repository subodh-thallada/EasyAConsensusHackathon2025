
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock traders data
const followedTraders = [
  {
    id: "1",
    name: "Crypto Alpha",
    avatarUrl: "",
    allocation: 40,
    pnl: 18.5,
    lastTraded: "2 hours ago",
  },
  {
    id: "2",
    name: "Stable Growth",
    avatarUrl: "",
    allocation: 35,
    pnl: 7.2,
    lastTraded: "6 hours ago",
  },
  {
    id: "3",
    name: "Aptos Maximalist",
    avatarUrl: "",
    allocation: 25,
    pnl: -4.8,
    lastTraded: "1 day ago",
  },
];

const TradersList = () => {
  const { toast } = useToast();

  const handleUnfollow = (traderId: string, traderName: string) => {
    toast({
      title: "Trader unfollowed",
      description: `You have unfollowed ${traderName}. Your funds will be returned to your wallet.`,
    });
    console.log(`Unfollowed trader ${traderId}`);
  };

  const remainingAllocation = 100 - followedTraders.reduce((total, trader) => total + trader.allocation, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followed Traders</CardTitle>
        <CardDescription>Your portfolio is following these traders</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {followedTraders.map((trader) => (
            <div key={trader.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-aptos-primary to-aptos-accent flex items-center justify-center text-white font-medium">
                    {trader.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{trader.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last traded {trader.lastTraded}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUnfollow(trader.id, trader.name)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Unfollow {trader.name}</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-muted-foreground">Allocation</div>
                  <div className="font-medium">{trader.allocation}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">P&L</div>
                  <div
                    className={`font-medium flex items-center ${
                      trader.pnl >= 0 ? "text-aptos-accent" : "text-red-500"
                    }`}
                  >
                    {trader.pnl >= 0 ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(trader.pnl)}%
                  </div>
                </div>
              </div>
            </div>
          ))}

          {remainingAllocation > 0 && (
            <div className="p-6 text-center">
              <div className="mb-2 text-muted-foreground">
                You still have <span className="font-medium text-foreground">{remainingAllocation}%</span> of your portfolio unallocated
              </div>
              <Button variant="outline" className="border-dashed">
                Add More Traders
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradersList;
