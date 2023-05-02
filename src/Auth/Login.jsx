import {
    Form,
    Input,
    Button,
    Checkbox,
    notification,
} from "antd";
import axios from "axios";
import "../../Styles/Login.css";
import { useEffect, useState } from "react";
import useToken from "../Hooks/UseToken";
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";
import LoadingComp from "../Components/Loading/Loading1";

const Login = () => {
    const [loading, setLoading] = useState(true);
    const { token, setToken } = useToken();
    const navigate = useNavigate();
    const onFinish = (values) => {
        axios
            .post(
                "Link",
                {
                    fio: values.fio,
                    password: values.password,
                }
            )
            .then((data) => {
                setToken(data.data.data, values.remember);
                window.location.href = "/";
            })
            .catch((err) => {
                notification["error"]({
                    message: "Kirishda xatolik",
                    description:
                        "Ism sharifingizni yoki parolni noto'g'ri kiritdingiz.",
                    duration: 3,
                    icon: <FrownOutlined style={{ color: "#f00" }} />,
                });
                setLoading(false);
                console.error(err);
                navigate("/login");
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    const handleChange = () => {};

    useEffect(() => {
        if (token) {
            navigate("/");
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingComp />;
    }

    return (
        <div className="login">
            <div className="login-page">
                <div className="login-box">
                    <div className="illustration-wrapper">
                        <div style={{ marginBottom: "7%" }}>
                            <h1>Myteacher.com</h1>
                        </div>
                    </div>
                    <Form
                        name="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p className="form-title">Xush kelibsiz</p>
                        <p>O'z sahifangizga kiring</p>
                        <Form.Item
                            name="fio"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Iltimos ism sharifingizmi kiriting",
                                },
                            ]}
                        >
                            <Input placeholder="Ism sharifingizmi kiriting" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Iltimos parolingizni kiritig",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Parolingizni kiriting" />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Meni eslab qol</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={handleChange}
                            >
                                KIRISH
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;

// import { Helmet } from 'react-helmet-async';
// // @mui
// import { styled } from '@mui/material/styles';
// import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// // hooks
// import useResponsive from '../hooks/useResponsive';
// // components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// // sections
// import { LoginForm } from '../sections/auth/login';

// // ----------------------------------------------------------------------

// const StyledRoot = styled('div')(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex',
//   },
// }));

// const StyledSection = styled('div')(({ theme }) => ({
//   width: '100%',
//   maxWidth: 480,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   boxShadow: theme.customShadows.card,
//   backgroundColor: theme.palette.background.default,
// }));

// const StyledContent = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0),
// }));

// // ----------------------------------------------------------------------

// export default function LoginPage() {
//   const mdUp = useResponsive('up', 'md');

//   return (
//     <>
//       <Helmet>
//         <title> Login | Minimal UI </title>
//       </Helmet>

//       <StyledRoot>
//         <Logo
//           sx={{
//             position: 'fixed',
//             top: { xs: 16, sm: 24, md: 40 },
//             left: { xs: 16, sm: 24, md: 40 },
//           }}
//         />

//         {mdUp && (
//           <StyledSection>
//             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//               Hi, Welcome Back
//             </Typography>
//             <img src={} alt="login" />
//           </StyledSection>
//         )}

//         <Container maxWidth="sm">
//           <StyledContent>
//             <Typography variant="h4" gutterBottom>
//               Sign in to Minimal
//             </Typography>

//             <Typography variant="body2" sx={{ mb: 5 }}>
//               Don’t have an account? {''}
//               <Link variant="subtitle2">Get started</Link>
//             </Typography>

//             <Stack direction="row" spacing={2}>
//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
//               </Button>

//               <Button fullWidth size="large" color="inherit" variant="outlined">
//                 <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
//               </Button>
//             </Stack>

//             <Divider sx={{ my: 3 }}>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 OR
//               </Typography>
//             </Divider>

//             <LoginForm />
//           </StyledContent>
//         </Container>
//       </StyledRoot>
//     </>
//   );
// }
