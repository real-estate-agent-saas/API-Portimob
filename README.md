# 🧭 TEMPLATE GUIDE — Gestão de Templates e Configurações

Guia técnico para estruturar, versionar e manter templates personalizados no sistema de corretores de imóveis.  
Aplica-se a um backend **NestJS (MongoDB)** e frontend **NextJS**.

---

## 📦 1. Estrutura de Dados e Performance

| Item | Descrição | Status |
|------|------------|--------|
| **1.1 Modularizar o `template_config`** | Separar seções (hero, about, contact, etc.) dentro do documento para evitar regravações grandes. | [ ] |
| **1.2 Evitar dados binários no MongoDB** | Armazenar apenas URLs (ex: S3, Firebase) e não base64. | [ ] |
| **1.3 Atualizar seções com `$set` parcial** | Atualizar apenas o campo modificado, sem regravar o documento inteiro. | [ ] |
| **1.4 Monitorar tamanho médio dos documentos** | Criar log ou métrica que alerta se configs passam de 500KB. | [ ] |
| **1.5 (Opcional) Compressão de configs** | Implementar compressão (zlib/gzip) se configs se tornarem grandes. | [ ] |

---

## 🧬 2. Controle de Versão e Compatibilidade

| Item | Descrição | Status |
|------|------------|--------|
| **2.1 Adicionar campo `templateVersion` no `template_config`** | Exemplo: `"templateVersion": "1.0.0"`. | [ ] |
| **2.2 Atualizar versão do template base** | Incrementar `MAJOR.MINOR.PATCH` sempre que houver alteração estrutural. | [ ] |
| **2.3 Criar migrador de templates** | Função que detecta diferença de versão e atualiza configs antigas. | [ ] |
| **2.4 Manter compatibilidade retroativa no frontend** | Tratar campos antigos: `config.hero.title || config.hero.headline`. | [ ] |
| **2.5 Versionar templates no frontend** | Estrutura: `/templates/template_moderno/v1`, `/v2`, etc. | [ ] |

---

## 🔁 3. Clonagem e Troca de Template

| Item | Descrição | Status |
|------|------------|--------|
| **3.1 Criar processo de clonagem padrão** | Ao criar conta → gerar `website` → clonar `template` → criar `template_config` herdando `defaultConfig`. | [ ] |
| **3.2 Verificar existência de `template_config` antes de criar novo** | Se o usuário trocar de template, criar novo config apenas se ainda não existir. | [ ] |
| **3.3 Permitir troca segura de template** | Atualizar apenas `website.templateId` e preservar configs antigas. | [ ] |
| **3.4 (Opcional) Histórico de templates usados** | Manter log de templates antigos para restauração. | [ ] |

---

## 🧱 4. Estrutura e Organização do Código

| Item | Descrição | Status |
|------|------------|--------|
| **4.1 Definir schema claro para `Template`** | Campos: `defaultConfig`, `version`, `previewImage`, `category`, etc. | [ ] |
| **4.2 Definir schema para `TemplateConfig`** | Campos: `templateId`, `templateVersion`, `config`, `websiteId`, `updatedAt`. | [ ] |
| **4.3 Adicionar índices** | Indexar `{ websiteId: 1 }`, `{ templateId: 1 }` em `template_config`. | [ ] |
| **4.4 Separar responsabilidades no backend** | Criar `TemplateService`, `TemplateConfigService`, `WebsiteService`. | [ ] |
| **4.5 (Opcional) Criar DTOs e interfaces tipadas** | Evita inconsistências e facilita migrações. | [ ] |

---

## 🧩 5. Frontend e Renderização Dinâmica

| Item | Descrição | Status |
|------|------------|--------|
| **5.1 Carregar template e config corretos via API** | Ex: `/websites/:id` → retorna `{ template, config }`. | [ ] |
| **5.2 Mapear seções dinamicamente** | Ex: `<DynamicRenderer sections={config.sections} />`. | [ ] |
| **5.3 Tratar ausência de seções** | Evitar erros caso o usuário delete partes do layout. | [ ] |
| **5.4 Criar fallback visual para campos ausentes** | Ex: se não houver `hero.image`, exibir cor padrão. | [ ] |
| **5.5 (Opcional) Implementar modo preview** | Permitir visualização antes de salvar alterações. | [ ] |

---

## 🕵️ 6. Logs, Auditoria e Backups

| Item | Descrição | Status |
|------|------------|--------|
| **6.1 Adicionar `updatedAt` e `updatedBy` em `template_config`** | Saber quem alterou e quando. | [ ] |
| **6.2 Guardar histórico de alterações (opcional)** | Ex: `history: [{ date, changes, userId }]`. | [ ] |
| **6.3 Criar endpoint de rollback** | Restaura snapshot anterior do config. | [ ] |
| **6.4 Fazer backup periódico de templates e configs** | Especialmente antes de releases grandes. | [ ] |

---

## 🚀 7. Deploy e Novos Templates

| Item | Descrição | Status |
|------|------------|--------|
| **7.1 Testar novos templates em staging** | Garantir que `defaultConfig` é válido antes do deploy. | [ ] |
| **7.2 Validar compatibilidade com frontend atual** | Checar se componentes aceitam o schema novo. | [ ] |
| **7.3 Atualizar versionamento no backend e frontend** | Manter consistência entre `Template.version` e `/templates/vX`. | [ ] |
| **7.4 Atualizar migradores se necessário** | Ao adicionar novas propriedades. | [ ] |
| **7.5 Logar release dos templates** | Armazenar registro de versão, data e mudanças principais. | [ ] |

---

## 🧠 Dica Final

> 💡 Mantenha este arquivo atualizado com cada novo template ou alteração de estrutura.  
> Ele serve como **documentação viva** do sistema de templates da plataforma.

