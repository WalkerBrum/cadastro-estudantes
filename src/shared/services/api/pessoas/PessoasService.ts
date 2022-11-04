import { Environment } from './../../../environment/index';
import { Api } from '../axios-config';

interface IListagemPessoa {
    id: number;
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

interface IDetalhePessoa {
    id: number;
    email: string;
    cidadeId: number;
    nomeCompleto: string;
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`; 
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            };
        }
        
        return new Error('Erro ao listar os registros.');

    } catch (error) {
        console.log(error);
        return new Error((error as  {message:string }).message || 'Erro ao listar os registros.');
    }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
    try {
        const urlRelativa = `/pessoas/:${id}`;

        const { data } = await Api.get(urlRelativa);

        if (data) return data;

        return new Error('Erro ao consultar o registro.');

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
    try {
        const urlRelativa = '/pessoas';

        const { data } = await Api.post<IDetalhePessoa>(urlRelativa, dados);

        if (data) return data.id;

        return new Error('Erro ao criar o registro.');

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: IDetalhePessoa ): Promise<void | Error> => {
    try {
        const urlRelativa = `/pessoas/:${id}`;

        await Api.post<IDetalhePessoa>(urlRelativa, dados);

        return new Error('Erro ao criar o registro.');

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao criar o registro.');
    }
};

const deleteById = async (id: number): Promise<Promise<void | Error>> => {
    try {
        const urlRelativa = `/pessoas/:${id}`;

        await Api.delete<IDetalhePessoa>(urlRelativa);

        return new Error('Erro ao criar o registro.');

    } catch (error) {

        return new Error((error as  {message:string }).message || 'Erro ao criar o registro.');
    }
};


export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};