import { useState } from "react";
import "./styles/global.css";

import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * to-do
 *
 * [x] Validação / Transformação- para começar a trabalhar com validação é preciso importar o zod.
 * [x] Field Array-
 * [ ] Upload de Arquivos-
 * [ ] Composition Pattern-
 */

const creatUserFormSchema = z.object({
  //Schema: Nada mais é do que uma representação de uma estrutura de dados dados.
  // O zod, permite que façamos algumas validações, ex.: .nonempty('O E-mail é obrigatório')
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .transform((name) => {
      return name
        .trim() // (.trim)remove qulquer espaçamento deixado na esqueda ou direta.
        .split(" ") // (.splite (' ')splite no espaço (_) dividir o nome do sobre nome, caso tenha.
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O E-mail é obrigatório")
    .email("Formato de E-mail inválido")
    .refine((email) => {
      return email.endsWith("@gmail.com");
    }, "O e-mail precisa ser do google"),
  password: z.string().min(6, "A senha precisa de no minimo 6 caracteres"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("o título é obrigatório"),
        knowledge: z.coerce.number().min(1).max(100),
      })
    )
    .min(2, "Insira pelo menos 2 tecnologias"),
});

type CreateUserFormData = z.infer<typeof creatUserFormSchema>;

export function App() {
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(creatUserFormSchema),
  });
  /*  O useForm ira devolver duas informaçães que são cruciais.
   A primeira delas é (register){que vai falar para o react hook form,
     quais são os campos do nosso formulário, então, vamos registrar quais 
    são os campos do formulário }. 
  */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  function creatUser(data: CreateUserFormData) {
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
          <label htmlFor="name">Name</label>
          <input
            type="name"
            // name="name" não precisa mais, ja que tem o ...register(name)
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            // name="email" não precisa mais, ja que tem o ...register(email)
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            // name="password"  não é mais necessario...register(passowrd)
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias
            <button
              type="button"
              onClick={addNewTech}
              className="text-emerald-500 text-sm"
            >
              Adicionar
            </button>
          </label>

          {fields.map((field, index) => {
            return (
              <div className="flex gap-2" key={field.id}>
                <div className="flex-1 flex flex-col gap-1">
                  <input
                    type="text"
                    className=" border border-zinc-200 shadow-sm rounded h-10 px-3"
                    {...register(`techs.${index}.title`)}
                  />
                  {errors.techs?.[index]?.title && (
                    <span className="text-red-500 text-sm">
                      {errors.techs?.[index]?.title?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    className="w-16 flex-1 order border-zinc-200 shadow-sm rounded h-10 px-3"
                    {...register(`techs.${index}.knowledge`)}
                  />
                  {errors.techs?.[index]?.knowledge && (
                    <span className="text-red-500 text-sm">
                      {errors.techs?.[index]?.knowledge?.message}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {errors.techs && (
            <span className="text-red-500 text-sm">{errors.techs.message}</span>
          )}
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
