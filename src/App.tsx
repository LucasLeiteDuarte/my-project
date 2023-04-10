import { useState } from "react";
import "./styles/global.css";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * to-do
 *
 * [ ] Validação / Transformação- para começar a trabalhar com validação é preciso importar o zod.
 * [ ] Field Array-
 * [ ] Upload de Arquivos-
 * [ ] Composition Pattern-
 */

const creatUserFormSchema = z.object({
  //Schema: Nada mais é do que uma representação de uma estrutura de dados dados.
  // O zod, permite que façamos algumas validações, ex.: .nonempty('O E-mail é obrigatório')
  email: z
    .string()
    .nonempty("O E-mail é obrigatório")
    .email("Formato de E-mail inválido"),
  password: z.string().min(6, "A senha precisa de no minimo 6 caracteres"),
});

type CreateUserFormData = z.infer<typeof creatUserFormSchema>;

export function App() {
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(creatUserFormSchema),
  });

  /*  O useForm ira devolver duas informaçães que são cruciais.
   A primeira delas é (register){que vai falar para o react hook form,
     quais são os campos do nosso formulário, então, vamos registrar quais 
    são os campos do formulário }. 
  */

  function creatUser(data: any) {
    /* Ao inves de usar um conslo.log()
   com os dados do formulário vou colocar os dados em um estado(UseState)
   para ficar mais fácil mostrando em tela */
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="h-screen bg-zinc-50 flex-col gap-10 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(creatUser)}
        /* high order function. Tem o mesmo conceito de: map .reduce.
         Que basicamente estámos passando umafunção(creatUser) 
         para outra função (handleSubmit) e essa função {}devolve um função.
          (Serve para mostrar o que foi escrito no formulário)
         */
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            // name="email" não precisa mais, ja que tem o ...register(email)
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            // name="password"  não é mais necessario...register(passowrd)
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10
          hover:bg-emerald-600"
        >
          salvar
        </button>
      </form>
      <pre>{output}</pre>
    </main>
  );
}
