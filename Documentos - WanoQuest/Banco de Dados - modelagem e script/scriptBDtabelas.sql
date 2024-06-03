-- 
drop database WanoQuest;
create database WanoQuest;
use WanoQuest;

create table personagem (
idPersonagem int primary key auto_increment,
nome varchar(45) not null,
descricao varchar(100)
);

create table tema (
idTema int primary key auto_increment,
titulo varchar(45)
);

create table quiz (
idQuiz int primary key auto_increment,
nome varchar(45) not null,
qtdPontos int not null,
fkTema int,
foreign key (fkTema) references tema(idTema)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(100) not null,
nickname varchar(15) not null unique,
email varchar(45) not null unique,
senha varchar(256) not null,
fkPersonagem int,

constraint chkEmail check (email like '%@%.com'),
foreign key (fkPersonagem) references personagem(idPersonagem)
);

create table postagem (
idPostagem int primary key auto_increment,
mensagem varchar(200),
fkUsuario int,
fkTema int,
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkTema) references tema(idTema)
);

create table pontuacao (
fkUsuario int,
fkQuiz int,
pontos int not null,
dataPontuacao datetime,

foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkQuiz) references quiz(idQuiz),
primary key (fkUsuario, fkQuiz)
);

create table curtir (
fkUsuario int,
fkPostagem int,
dataCurtida date,

foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkPostagem) references postagem(idPostagem)
);

insert into personagem (nome) values
('Luffy'),
('Zoro'),
('Nami'),
('Usopp'),
('Sanji'),
('Chopper'),
('Robin'),
('Brook'),
('Jinbe'),
('Franky'),

('Kaido'),
('Trafalgar Law'),
('Big Mom'),

('Kozuki Oden'),
('Kozuki Hiyori'),
('Kozuki Momonosuke'),
('Kozuki Hiyori'),
('Kurozumi Orochi');

-- 
insert into usuario (nome, nickname, email, senha, fkPersonagem) values ('Fernando Alves', 'Fern', 'fernando@outlook.com', md5('Ma1#'), 7);
insert into tema values (default, 'Kuri e a Capital das Flores');
insert into quiz values (default, 'Kuri e a Capital das Flores', 16, 1);

-- insert into pontuacao values (1, 1, 8);
-- insert into curtir values (1, 1),

select usuario.nome,
		quiz.nome,
		pontuacao.pontos
from pontuacao
join usuario on fkUsuario = idUsuario
join quiz on idQuiz = fkQuiz
where idUsuario = 1;

select quiz.nome,
		quiz.qtdQuestoes
from quiz;


select  u.nome,
		a.titulo
from curtir 
join usuario u on fkUsuario = idUsuario
join artigo a on fkArtigo = idArtigo;        


-- teste de listagem postagens
insert into postagem values
(default, 'mensagem usuario', 1, 1);

-- function listar postagens
select idPostagem, mensagem, fkUsuario, fkTema,
fkPersonagem, nickname,
titulo
from postagem
left join usuario on fkUsuario = idUsuario
left join tema on fkTema = idTema;

show tables;
desc postagem;
SELECT * FROM personagem;
SELECT * FROM usuario;
select * from postagem;
select * from tema;
