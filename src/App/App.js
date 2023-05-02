import Routes from "../Routes";
import { Button, Result } from "antd";
import ThemeProvider from "../Themes";
import useNetwork from "../Hooks/UseNetwork";
import { AxiosInterceptor } from "../Api/Axios";
import ScrollTop from "../Components/ScrollTop";
import { DataProvider } from "../Context/DataContext";
import { TableProvider } from "../Context/TableContext";

function App() {
    const { isOnline: isNetwork } = useNetwork();

    return (
        <>
            {!isNetwork ? (
                <>
                    <Result
                        status="404"
                        title="No Internet Connection"
                        subTitle="Check your Internet Connection or your network."
                        extra={
                            <Button href="/" type="primary">
                                Try Again
                            </Button>
                        }
                    />
                </>
           ) :  ( 
                    <>
                        <AxiosInterceptor>
                            <ThemeProvider>
                                <ScrollTop>
                                    <DataProvider>
                                        <TableProvider>
                                            <Routes />
                                        </TableProvider>
                                    </DataProvider>
                                </ScrollTop>
                            </ThemeProvider>
                        </AxiosInterceptor>
                    </>
                )
            }
        </>
    );
}

export default App;
