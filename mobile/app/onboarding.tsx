import React from "react";
import {
  Atom,
  Calendar,
  HeartHandshake,
  Sparkles
} from "@tamagui/lucide-icons";
import {
  OnboardingStepInfo,
  OnboardingView
} from "components/onboarding/OnboardingView";
import StepContent from "components/onboarding/StepContent";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  const steps: OnboardingStepInfo[] = [
    {
      theme: "dark_blue",
      Content: () => (
        <StepContent
          title="Science Услуги"
          icon={Sparkles}
          description="Приложение предназначено для упрощения процесса сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям."
        />
      )
    },
    {
      theme: "blue",
      Content: () => (
        <StepContent
          title="Организации"
          icon={Atom}
          description="Список научно-исследовательских организаций, Вузов и частных компаний. Профили организаций с детальной информацией."
        />
      )
    },
    {
      theme: "green",
      Content: () => (
        <StepContent
          title="Услуги"
          icon={HeartHandshake}
          description="Каталог научных услуг от каждой организации. Описание, стоимость и способы заказа услуг."
        />
      )
    },
    {
      theme: "purple",
      Content: () => (
        <StepContent
          title="Мероприятия"
          icon={Calendar}
          description="Календарь семинаров, конференций и других мероприятий."
        />
      )
    }
  ];

  return (
    <OnboardingView
      autoSwipe
      onOnboarded={() => router.push("authorization")}
      steps={steps}
    />
  );
}
