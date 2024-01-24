import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Snackbar } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import Header from "components/typography/Header";
import { Image } from "react-native";
import { useAuth } from "providers/AuthProvider";
import { LoginScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import theme from "styles/theme";
// import Logo from "../../components/Logo";
import * as yup from "yup";


const schema = yup
  .object({
    username: yup.string().email().required(),
    password: yup.string().required()
  })
  .required();

interface FormValues {
  username: string;
  password: string;
}

const Login = ({ navigation }: LoginScreenProps) => {
  const { onLogin, isLoginLoading, loginError, loginReset } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    onLogin(formValues);
  };

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={commonStyles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoSize}
            resizeMode="contain"
          />
          {/* <Logo></Logo> */}
        </View>
       
        <Header>Добро пожаловать.</Header>

        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Электронная почта"
              autoComplete="email"
              inputMode="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="emailAddress"
              keyboardType="email-address"
              error={errors.username?.message}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Пароль"
              autoComplete="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              error={errors.password?.message}
            />
          )}
        />

        <PrimaryButton
          mode="contained"
          loading={isLoginLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Войти
        </PrimaryButton>

        <View style={styles.row}>
          <Text style={styles.label}>Нет аккаунта?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Snackbar
        visible={!!loginError}
        onDismiss={() => {}}
        action={{
          label: "Undo",
          onPress: loginReset
        }}
        duration={Snackbar.DURATION_MEDIUM}
      >
        {String(loginError) || "Ошибка входа"}
      </Snackbar>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    gap: 4,
    alignSelf: "center"
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  },
  logoContainer: {
    alignItems: "center",
    padding: 5,
  },
  logoSize: {
    width: 225, 
    height: 225,
  }
});

export default Login;
