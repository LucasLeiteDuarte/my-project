import "./styles/global.css";

import {useForm} from 'react-hook-form'


export function App() {
  const {register} = useForm()
  /*  o useForm ira devolver duas informaçães que são cruciais.
   A primeira delas é (register){que vai falar para o react hook form,
     quais são os campos do nosso formulário, então, vamos registrar quais 
    são os campos do formulário }. 
  */
  return (
    <main className="h-screen bg-zinc-50 flex items-center justify-center">
      <form className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            placeholder="E-mail"
            type="email"
            name="email"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            placeholder="senha"
            type="password"
            name="password"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10
          hover:bg-emerald-600"
        >
          salvar
        </button>
      </form>
    </main>
  );
}
