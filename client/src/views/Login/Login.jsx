import { Button, Card, Divider, Grid, Paper, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import SubTitle from "../../components/SubTitle";
import bgImg from "../../assets/loginImg.jpg";
import Avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import CustSnackbar from "../../components/CustSnackbar";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import HandleRefresh from "../../utils/HandleRefresh";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [img, setImg] = useState('../../assets/Login.jpg')

  let [message, setMessage] = useState("");
  let [alert, setAlert] = useState(false);
  let [severity, setServerity] = useState("success");

  const handleSubmit = async () => {
    // console.log(email,password)
    var formData = new FormData();
    formData = {
      email: email,
      password: password,
    };

    const res = await AuthServices.login(formData);
    console.log(res);

    if (res?.status < 300) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.info.user));
      if (res.data.info.user.userType === 1) {
        navigate("/profile");
        HandleRefresh(1);
      } else if (res.data.info.user.userType === 2) {
        navigate("/profile");
        HandleRefresh(1);
      } else if (res.data.info.user.userType === 3) {
        navigate("/profile");
        HandleRefresh(1);
      } else if (res.data.info.user.userType === 4) {
        navigate("/profile");
        HandleRefresh(1);
      } else if (res.data.info.user.userType === 5) {
        navigate("/profile");
        HandleRefresh(1);
      } else {
        HandleRefresh(1);
        navigate("/profile");
      }
      // handleRedirect()
    } else if (res?.status > 399) {
      setError(true);
      setAlert(true);
      setMessage(res.data.errors[0].msg);
      setServerity("error");
      // HandleRefresh(1)
    }
  };

  return (
    <Fragment>
      <ValidatorForm onSubmit={handleSubmit}>
        <Grid sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            square
            sx={{
              backgroundColor: "rgba(255,255,255,1)",
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              backgroundImage: "url(" + bgImg + ")",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
            elevation={6}
          >
            <Card
              sx={{
                m: 20,
                mt: 15,
                p: 10,
                backgroundColor: "rgba(250,250,250,0.85)",
                height: "520px",
                width: "30vw",
              }}
            >
              <Grid container sx={{ display: "flex" }}>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  // sx={{p:5}}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={Avatar}
                    alt="avatar"
                    style={{ borderRadius: "50%" }}
                  />
                </Grid>

                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  // sx={{p:5}}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 5 }}>
                    <SubTitle title="Email" />
                    <TextValidator
                      placeholder="Enter your email address"
                      name="address"
                      color="green"
                      InputLabelProps={{
                        shrink: false,
                      }}
                      value={email}
                      disabled={false}
                      type="email"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      validators={[
                        "required",
                        "matchRegexp:^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
                      ]}
                      errorMessages={["Email is required", "Enter valid email"]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 5 }}>
                    <SubTitle title="Password" />
                    <TextValidator
                      fullWidth
                      placeholder="Enter your password"
                      name="ID"
                      // sx={{backgroundColor: 'rgba(255,255,255,0.5)'}}
                      color="green"
                      InputLabelProps={{
                        shrink: false,
                      }}
                      value={password}
                      disabled={false}
                      type="password"
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      validators={["required"]}
                      errorMessages={["Password is required"]}
                    />
                  </Grid>
                  {error ? (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      sx={{ px: 10, py: 2, pb: 3 }}
                      style={{
                        backgroundColor: "rgba(255,50,50,0.2)",
                        borderRadius: "20px",
                      }}
                    >
                      <Typography variant="caption" color="error">
                        {message}
                      </Typography>
                    </Grid>
                  ) : null}
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    sx={{
                      pt: 5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Grid
                      sx={{ p: 5, display: "flex", justifyContent: "center" }}
                    >
                      <Button type="submit" variant="contained" color="green">
                        Login
                      </Button>
                    </Grid>
                    <Typography
                      sx={{ p: 5, display: "flex", justifyContent: "center" }}
                    >
                      or
                    </Typography>
                    <Grid
                      sx={{ p: 5, display: "flex", justifyContent: "center" }}
                    >
                      <Link
                        to="/register/student"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          // type='submit'
                          variant="contained"
                          color="green"
                        >
                          Register
                        </Button>
                      </Link>
                    </Grid>
                    <Divider />
                    <Grid
                      sx={{ p: 5, display: "flex", justifyContent: "center" }}
                    >
                      <Link to="/classes" style={{ textDecoration: "none" }}>
                        <Button
                          // type='submit'
                          variant="outlined"
                          color="green"
                        >
                          View all Classes
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </Grid>
      </ValidatorForm>
      <CustSnackbar
        open={alert}
        onClose={() => {
          setAlert(false);
        }}
        message={message}
        autoHideDuration={3000}
        severity={severity}
        elevation={2}
        variant="filled"
      ></CustSnackbar>
    </Fragment>
  );
};

export default Login;
