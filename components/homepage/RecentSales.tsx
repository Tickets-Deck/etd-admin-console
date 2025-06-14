import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NairaPrice } from "@/constants/priceFormatter";
import { IRecentTransactions } from "@/models/IRecentTransactions";

type RecentSalesProps = {
  recentTransactions: IRecentTransactions[];
};

export function RecentSales({ recentTransactions }: RecentSalesProps) {
  return (
    <div className="space-y-8 max-h-[350px] overflow-y-auto pr-2">
      {recentTransactions.map((transaction) => {
        const initials = transaction.contactFirstName.charAt(0).toLocaleUpperCase() + transaction.contactLastName.charAt(0).toLocaleUpperCase();
        const fullname = `${transaction.contactFirstName} ${transaction.contactLastName}`;
        return (
          <div key={transaction.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={"/placeholder.svg?height=36&width=36"}
                alt="Avatar"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none capitalize">
                {fullname}
              </p>
              <p className="text-sm text-muted-foreground">
                {transaction.contactEmail}
              </p>
            </div>
            <div className="ml-auto font-medium">{NairaPrice.format(Number(transaction.totalPrice))}</div>
          </div>
        );
      })}
    </div>
  );
}
