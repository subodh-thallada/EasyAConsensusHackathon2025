
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const mockLeaderboardData = [
  {
    id: "1",
    rank: 1,
    name: "Crypto Oracle",
    yield: 47.8,
    followers: 3456,
    aum: "$4.2M",
    change: "+2",
  },
  {
    id: "2",
    rank: 2,
    name: "Aptos Alpha",
    yield: 42.5,
    followers: 2981,
    aum: "$3.7M",
    change: "0",
  },
  {
    id: "3",
    rank: 3,
    name: "Moon Voyager",
    yield: 39.1,
    followers: 1842,
    aum: "$2.9M",
    change: "-1",
  },
  {
    id: "4",
    rank: 4,
    name: "Stable Growth",
    yield: 36.4,
    followers: 2119,
    aum: "$2.6M",
    change: "+3",
  },
  {
    id: "current",
    rank: 17,
    name: "You",
    yield: 32.6,
    followers: 23,
    aum: "$125K",
    change: "+5",
    isCurrent: true,
  },
];

const TraderLeaderboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trader Leaderboard</CardTitle>
        <CardDescription>See how you compare to other traders on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-8 text-xs text-muted-foreground font-medium py-2 px-4">
            <div className="col-span-1">Rank</div>
            <div className="col-span-3">Trader</div>
            <div className="col-span-1 text-right">Yield</div>
            <div className="col-span-1 text-right">Followers</div>
            <div className="col-span-1 text-right">AuM</div>
            <div className="col-span-1 text-right">Change</div>
          </div>

          {mockLeaderboardData.slice(0, 4).map((trader) => (
            <div
              key={trader.id}
              className="grid grid-cols-8 items-center py-3 px-4 hover:bg-muted/50 rounded-md transition-colors"
            >
              <div className="col-span-1 font-medium">{trader.rank}</div>
              <div className="col-span-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-aptos-primary to-aptos-secondary flex items-center justify-center text-white text-sm">
                  {trader.name.charAt(0)}
                </div>
                <span>{trader.name}</span>
              </div>
              <div className="col-span-1 text-right text-aptos-accent font-medium">
                +{trader.yield}%
              </div>
              <div className="col-span-1 text-right font-medium">
                {trader.followers.toLocaleString()}
              </div>
              <div className="col-span-1 text-right font-medium">{trader.aum}</div>
              <div className="col-span-1 text-right">
                {trader.change.startsWith("+") ? (
                  <span className="text-aptos-accent flex items-center justify-end">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {trader.change}
                  </span>
                ) : trader.change === "0" ? (
                  <span className="text-muted-foreground">—</span>
                ) : (
                  <span className="text-red-500 flex items-center justify-end">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    {trader.change.replace("-", "")}
                  </span>
                )}
              </div>
            </div>
          ))}

          <div className="py-2 px-4 text-center text-muted-foreground text-xs">• • •</div>

          <div
            className="grid grid-cols-8 items-center py-3 px-4 bg-aptos-primary/10 dark:bg-aptos-primary/20 rounded-md"
          >
            <div className="col-span-1 font-medium">{mockLeaderboardData[4].rank}</div>
            <div className="col-span-3 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-aptos-accent to-aptos-primary flex items-center justify-center text-white text-sm">
                Y
              </div>
              <span className="font-medium">You</span>
            </div>
            <div className="col-span-1 text-right text-aptos-accent font-medium">
              +{mockLeaderboardData[4].yield}%
            </div>
            <div className="col-span-1 text-right font-medium">
              {mockLeaderboardData[4].followers}
            </div>
            <div className="col-span-1 text-right font-medium">{mockLeaderboardData[4].aum}</div>
            <div className="col-span-1 text-right">
              <span className="text-aptos-accent flex items-center justify-end">
                <ArrowUp className="h-3 w-3 mr-1" />
                {mockLeaderboardData[4].change}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Button variant="outline">View Full Leaderboard</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TraderLeaderboard;
