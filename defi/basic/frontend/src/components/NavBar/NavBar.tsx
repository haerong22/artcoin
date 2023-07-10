import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export function NavBar(props: any) {
  return (
    <div>
      <Button>
        <Link to="/">Swap</Link>
      </Button>
      <Button>
        <Link to="/liquidity">Liquidity</Link>
      </Button>
    </div>
  );
}
