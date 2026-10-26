"use client";

import { useActionState } from "react";
import { updateProfile, type ProfileState } from "@/app/(app)/perfil/actions";
import { Field, FormMessage, SubmitButton } from "@/components/auth/form-ui";

type ProfileFormProps = {
  name: string;
  city: string | null | undefined;
  supporterSince: number | null | undefined;
};

const initialState: ProfileState = { status: "idle" };

export function ProfileForm({ name, city, supporterSince }: ProfileFormProps) {
  const [state, action, pending] = useActionState(updateProfile, initialState);
  const errors = state.fieldErrors ?? {};
  // O React limpa o formulário após cada envio; com erro, repõe o que foi digitado.
  const values = state.values ?? { name, city: city ?? "", supporterSince: supporterSince?.toString() ?? "" };

  return (
    <form action={action} className="space-y-5">
      {state.status !== "idle" && state.message && (
        <FormMessage tone={state.status === "success" ? "success" : "error"}>{state.message}</FormMessage>
      )}
      <Field label="Nome" name="name" defaultValue={values.name} required maxLength={60} autoComplete="name" error={errors.name} />
      <Field
        label="Cidade de onde você torce"
        name="city"
        defaultValue={values.city}
        maxLength={60}
        autoComplete="address-level2"
        placeholder="Ex.: Santos, SP"
        error={errors.city}
      />
      <Field
        label="Santista desde"
        name="supporterSince"
        type="number"
        inputMode="numeric"
        min={1912}
        defaultValue={values.supporterSince}
        placeholder="Ano, ex.: 1998"
        hint="O ano em que o Santos virou o seu time."
        error={errors.supporterSince}
      />
      <div className="sm:max-w-xs">
        <SubmitButton pending={pending}>{pending ? "Salvando…" : "Salvar perfil"}</SubmitButton>
      </div>
    </form>
  );
}
