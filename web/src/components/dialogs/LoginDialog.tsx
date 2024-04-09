"use client"

import React from "react";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {DialogProps} from "@radix-ui/react-dialog";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/providers/AuthProvider";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

interface FormValues {
 username: string;
 password: string;
}

const schema = yup.object().shape({
    username: yup
      .string()
      .email("Введите почту корректно")
      .required("Введите электронную почту"),
    password: yup.string().required("Введите пароль")
});


interface LoginDialogProps extends Pick<DialogProps, 'open' | 'onOpenChange'>{

}

export default function LoginDialog({
  open,
  onOpenChange,
}: LoginDialogProps) {
    const {onLogin, isLoginLoading} = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

     const onSubmit = (formValues: FormValues) => {
        onLogin(formValues)
        onOpenChange?.(false)
        reset()
     };

     const handleOnOpenChange = (o: boolean) => {
         onOpenChange?.(o)
         reset()
     }

     return (
        <Dialog open={open} onOpenChange={handleOnOpenChange}>
          <DialogContent className="DialogContent">
            <DialogTitle className="DialogTitle">
              Войти
            </DialogTitle>
            <DialogDescription className="DialogDescription">
              Авторизуйтесь для взаимодействия с контентом.
            </DialogDescription>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <Input
                        placeholder='Электронная почта'
                        {...register('username')}
                        error={errors.username?.message}
                    />
                    <Input
                        placeholder='Пароль'
                        {...register('password')}
                        error={errors.password?.message}
                    />
                </div>

                <div className="flex justify-end mt-4">
                   <Button type="submit" loading={isLoginLoading}>
                      Войти
                   </Button>
                </div>
            </form>
          </DialogContent>
        </Dialog>
     )
}