import { FC, PropsWithChildren } from "react"

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return <>
        <div>
            <main>{children}</main>
            <div className="flex">
                <div className="flex w-full bg-gray justify-center absolute bottom-20">
                    <ul className="flex flex-row p-2">
                        <li className="mx-2 hover:text-white-900" style={{color:'white'}}><a href="#">¿Que es la UTEC?</a></li>
                        <li className="mx-2 hover:text-white-900" style={{color:'white'}}><a href="#">Preguntas frecuentes</a></li>
                        <li className="mx-2 hover:text-white-900" style={{color:'white'}}><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </>

}

export default AuthLayout;