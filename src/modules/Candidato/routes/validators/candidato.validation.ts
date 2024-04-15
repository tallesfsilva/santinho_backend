
import { celebrate, Joi, Segments } from 'celebrate';

export const createCandidatoMeddlware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome_campanha: Joi.string().required(),
    numero:  Joi.string().required(),
    nomeclatura:  Joi.string().required(),
    slug_candidato: Joi.string().required(),
    partido:  Joi.string().required(),
    numero_celular:  Joi.string().required(),
    nome_coligacao:  Joi.string().required(),
    coligacao_partido:  Joi.string().required(),
    apresentacao_candidato:  Joi.string(),
    link_perfil_facebook:  Joi.string(),
    link_perfil_instagram: Joi.string(),
    link_perfil_youtube:  Joi.string(),
  })
});

 
export const createSantinhoCandidatoMeddlware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    fundo_topo: Joi.string().required(),
    text_barra_meio: Joi.string().required(),
    fundo_barra_meio:  Joi.string().required(),
    fundo_rodape:  Joi.string().required(),
    logo_superior:  Joi.string().required(),
    foto_candidato:  Joi.string().required(),
    fundo_principal:  Joi.string().required()
    
  })
});

 
export const updateSantinhoCandidatoMeddlware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id_santinho: Joi.string().required(),
    fundo_topo: Joi.string().required(),
    text_barra_meio: Joi.string().required(),
    fundo_barra_meio:  Joi.string().required(),
    fundo_rodape:  Joi.string().required(),
    logo_superior:  Joi.string().required(),
    foto_candidato:  Joi.string().required(),
    fundo_principal:  Joi.string().required()
    
  })
});

export const updateandidatoMeddlware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    nome_campanha: Joi.string(),
    numero:  Joi.string(),
    nomeclatura:  Joi.string(),
    partido:  Joi.string(),
    slug_candidato: Joi.string(),
    numero_celular:  Joi.string(),
    nome_coligacao:  Joi.string(),
    coligacao_partido:  Joi.string(),
    apresentacao_candidato:  Joi.string(),
    link_perfil_facebook:  Joi.string(),
    link_perfil_instagram: Joi.string(),
    link_perfil_youtube:  Joi.string(),
  })
});
 
 

// export const destroySessionMiddleware = celebrate({
//   [Segments.BODY]: {
//     refresh_token: Joi.string(),
//   },
// }); // not needed in firebase revoke token
