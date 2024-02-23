import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Image } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import Header from "components/typography/Header";
import { useAuth } from "providers/AuthProvider";
import { LoginScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import theme from "styles/theme";
import * as yup from "yup";

import SolidButton from "../../components/buttons/SolidButton";
import { mantineColors } from "../../utils/colors";

const schema = yup
  .object({
    username: yup
      .string()
      .email("Введите почту корректно")
      .required("Введите электронную почту"),
    password: yup.string().required("Введите пароль")
  })
  .required();

interface FormValues {
  username: string;
  password: string;
}

const Login = ({ navigation }: LoginScreenProps) => {
  const { onLogin, isLoginLoading } = useAuth();

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
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoSize}
            resizeMode="contain"
          />
        </View>

        <Header>Добро пожаловать</Header>

        <View style={styles.inputsContainer}>
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
        </View>

        <View style={styles.buttonContainer}>
          <SolidButton
            title="Войти"
            loading={isLoginLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Нет аккаунта?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    gap: 6
  },
  buttonContainer: {
    marginTop: 16
  },
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
    fontFamily: "GoogleSans-Regular",
    color: mantineColors.gray[6]
  },
  link: {
    fontFamily: "GoogleSans-Bold",
    color: mantineColors.blue[5]
  },
  logoContainer: {
    alignItems: "center",
    padding: 5
  },
  logoSize: {
    width: 225,
    height: 225
  }
});

export default Login;
