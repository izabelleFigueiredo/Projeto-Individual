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
dataPontuacao datetime default now(),

foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkQuiz) references quiz(idQuiz),
primary key (fkUsuario, fkQuiz)
);

create table curtir (
fkUsuario int,
fkPostagem int,
dataCurtida datetime default now(),

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
insert into tema values (1, 'Kuri e a Capital das Flores');
insert into quiz values (1, 'Kuri e a Capital das Flores', 16, 1);



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


-- function listar postagens
select idPostagem, mensagem, fkUsuario, fkTema,
fkPersonagem, nickname,
titulo
from postagem
left join usuario on fkUsuario = idUsuario
left join tema on fkTema = idTema;

-- quantidade de postagens do usuario
select count(idPostagem) from postagem where fkUsuario = 2;

show tables;
desc postagem;
SELECT * FROM personagem;
SELECT * FROM usuario;
select * from postagem;
select * from tema;
select * from quiz;
select * from curtir;
select * from pontuacao;


-- insert pro curtir postagem 
insert into curtir values
(1, 2, default);

-- delete pro descurtir postagem
 DELETE FROM curtir WHERE fkUsuario = 3 and fkPostagem =3;

-- select pro grafico do index - curtidas
select ifnull(nickname, 'Nenhum Registro') as nickname, ifnull(count(idUsuario), 0) as qtdCurtidas
from curtir
join usuario on idUsuario = fkUsuario 
group by nickname order by qtdCurtidas desc limit 3
;

-- select pro grafico do index - pontuacao
select ifnull(nickname, 'Nenhum Registro') as nickname,  ifnull(sum(pontos), 0) as qtdPontos
from pontuacao
join usuario on idUsuario = fkUsuario 
group by idUsuario order by qtdPontos desc
limit 3;

-- select pra página do usuário - pontuacao
select sum(pontos) as totalPontos from pontuacao where fkUsuario = 3;

-- select pra página do usuário - quizzes realizados
select count(fkUsuario) as qtdQuizRealizado from pontuacao where fkUsuario = 3;

-- select pra página do usuário - suas postagens
select count(fkUsuario) as qtdPostsRealizados from postagem where fkUsuario = 2;

-- select pra página do usuário - curtidas recebidas
select count(fkPostagem) as qtdCurtidasRecebidas from curtir where fkUsuario = 6;

-- insert into pontuacao (fkUsuario, fkQuiz, pontos)values (1, 1, 18), (2, 1, 14);

