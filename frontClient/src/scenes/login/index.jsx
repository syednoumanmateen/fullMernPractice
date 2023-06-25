import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from 'service/Common'
import { setIsLogin, setUser } from 'state'
import * as Yup from 'yup'

const Login = () => {
    const theme = useTheme()

    const path = useSelector(state => state.global.path)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(2, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters')
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = async (e) => {
        try {
            const res = await axios.get(`${path}/general/login`, { params: e });
            const data = await res.data
            if (data) {
                dispatch(setUser(data))
                setLogin({ isLogin: true })
                dispatch(setIsLogin())
                navigate("/")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" pt="25vh">
                <Box backgroundColor={theme.palette.primary[500]} p="2rem" m="1rem" borderRadius="0.8rem">
                    <Box textAlign="center" mb="2.5rem">
                        <Typography variant="h1" fontWeight="bold" color={theme.palette.secondary[500]}>Ecomvision</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="email"
                                label="Email"
                                fullWidth
                                margin="dense"
                                {...register('email')}
                                error={errors.email ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.email?.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                margin="dense"
                                {...register('password')}
                                error={errors.password ? true : false}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.password?.message}
                            </Typography>
                        </Grid>


                    </Grid>

                    <Box mt={3}>
                        <Button
                            fullWidth={true}
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            sx={{
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.background.alt,
                                fontSize: "14px",
                                fontWeight: "bold",
                                "$:hover": {
                                    backgroundColor: theme.palette.background.alt,
                                    color: theme.palette.secondary.light
                                }
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Box >
        </>
    )
}

export default Login
