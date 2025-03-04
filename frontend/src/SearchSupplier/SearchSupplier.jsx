import { useLazyQuery } from "@apollo/client";
import { gql } from "../config/apolloClient";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

//Estilo css da página
import './SearchSupplie.css'

//Imagens estáticas
import Logo from '../assets/logo.png'
import imageSolution from '../assets/image-solution.png'

//Ícones
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { VscError } from "react-icons/vsc";

const GET_FORNECEDORES = gql`
    query GetFornecedores($consumo: Int!) {
        fornecedores(consumo: $consumo) {
            id
            nome
            logo
            estado
            custo_por_kwh
            limite_minimo_kwh
            avaliacaoMedia
            clientesAtendidos
        }
    }
`;


function SearchSupplie () {
    const [inputEnergia, setInputEnergia] = useState (false);
    const [valorConsumo, setValorConsumo] = useState ("");
    const [erroValue, setErroValue] = useState (false);
    const [showErroRequest, setShowErroRequest] = useState(false);
    const [buscarFornecedores, { data, loading, error }] = useLazyQuery(GET_FORNECEDORES);


    //Função para lidar com a busca de fornecedores
    const handleBuscarFornecedores = () => {
        const consumo = parseInt(valorConsumo, 10);
        if (isNaN(consumo) || consumo <= 0) { // Verificação para caso a regex do input deixe passar algo
            return setErroValue(true); // Seta a variável 'erroValue' como true e oculta o btn de busca
        }
        buscarFornecedores({ variables: { consumo } }); // Chama a consulta GraphQL 'GET_FORNECEDORES', passando 'consumo' como variável

    };

    // Atualiza o estado para exibir a mensagem quando houver erro
    useEffect(() => {
        if (error) {
            setShowErroRequest(true);
            // Define um tempo para ocultar a mensagem após 5 segundos (5000ms)
            const timer = setTimeout(() => {
                setShowErroRequest(false);
            }, 3000);

            return () => clearTimeout(timer); // Limpa o timeout quano o componente for desmontado
        }
    }, [error]);

    return (
        <>
           <div className='main__SearchSupplie'>
                <div className='header__SearchSupplie'>
                    <div className='box__image'>
                        <img className='logo' src={Logo} alt="" />
                    </div>
                    
                </div>
                <div className='section__main'>
                    <div className="get__started">
                        <h1 className="text__solution">Nossas <br/>Soluções</h1>
                        <p className="text__information">
                            Confira o serviço de busca de fornecedores da Clarke Energia! Informe seu consumo
                            mensal de energia e encontre as melhores opções de fornecimento para a sua empresa.
                        </p>

                        {!inputEnergia && (
                            <button className="btn__get__started" onClick={() => setInputEnergia(true)}>
                                <p>Encontrar fornecedor</p>
                                <IoIosArrowRoundForward className="icon__IoIosArrowRoundForward" />
                            </button>
                        )}
                        
                        {inputEnergia && (
                            <motion.div 
                                className="input-wrapper"
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <input 
                                    placeholder="Informe um valor, ex.: 30000" 
                                    className="input" 
                                    name="text" 
                                    type="text" 
                                    value={valorConsumo}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        // Regex: Permite apenas números, não permite "0" isolado, mas aceita "10", "100" etc.
                                        if (valor === "" || /^(?!0$)\d+$/.test(valor)) {
                                            setValorConsumo(valor);
                                        }
                                    }}
                                />
                                {loading ? (
                                    <div className="spinner"></div>
                                ):(
                                    <>
                                        {valorConsumo && !erroValue &&(
                                            <button className="Search-btn" onClick={handleBuscarFornecedores}>
                                                Encontrar
                                            </button> 
                                        )}
                                    </>
                                         
                                )}
                               
                            </motion.div>
                             
                        )}
                        
                    </div>

                    <div className='image__section'>
                        <img className='inner_image__solution' src={imageSolution} alt="" />
                    </div>

                </div>

                {/* Exibindo os fornecedores */}
                <div className="result__section">
                    {loading &&
                        <p>Buscando fornecedores...</p>
                    }
                    {showErroRequest &&
                        <p className="message__erro__request">
                            <VscError className="icon__VscError"/><br/>
                            Hummhumm...<br />Parece que houve um problema ao realizar a busca. Tente novamente mais tarde.
                        </p>
                    }
                    {/* Falta tratar essa situação */}
                    {data && data.fornecedores.length === 0 && <p>Nenhum fornecedor encontrado.</p>}
                    
                    {data && data.fornecedores.map((fornecedor) => (
                        
                        <div key={fornecedor.id} className="fornecedor__card">
                            <div className="box__fornecedor__logo">
                                <img src={`https://d15o6h0uxpz56g.cloudfront.net/${fornecedor.logo}`} alt={fornecedor.nome} className="fornecedor__logo"/>
                            </div>

                            <div className="box__fornecedor__information">
                                <h4>{fornecedor.nome} ● {fornecedor.estado}</h4>
                                
                                <div className="box__rating">
                                    <MdOutlineStar className="icon__MdOutlineStar"/>
                                    <p className="text__rating">{fornecedor.avaliacaoMedia.toFixed(1)} (422 avaliações)</p>
                                </div>

                                <div className="container__insights">
                                    <div className="box__insights">
                                        <BsBarChartFill className="icon__insights"/>
                                        <p className="text__insights">
                                            Limite mínimo<br/>
                                            {fornecedor.limite_minimo_kwh} kWh
                                        </p>
                                    </div>

                                    <div className="box__insights">
                                        <FaUsers className="icon__insights"/>
                                        <p className="text__insights">
                                            Clientes atendidos<br/>
                                            {fornecedor.clientesAtendidos}+
                                        </p>
                                    </div>
                                    
                                </div>
                                
                                
                                <div className="bottom__card">
                                    <div className="box__value__kwh">
                                        <h3>R$ {fornecedor.custo_por_kwh.toFixed(2)}</h3>
                                        <p className="text__kwh">/kWh</p>
                                    </div>
                                    

                                    <button className="btn__fake">
                                        <IoIosArrowRoundForward className="icon__IoIosArrowRoundForward in__btn__fake"/>

                                    </button>
                                </div>

                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default SearchSupplie;