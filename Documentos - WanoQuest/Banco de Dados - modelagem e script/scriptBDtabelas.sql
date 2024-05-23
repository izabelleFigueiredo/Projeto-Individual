-- drop database WanoQuest;
create database WanoQuest;
use WanoQuest;

create table personagem (
idPersonagem int primary key auto_increment,
nome varchar(45) not null,
descricao varchar(100)
);

create table quiz (
idQuiz int primary key auto_increment,
nome varchar(45) not null,
descricao varchar(200),
qtdQuestoes int not null
);

create table artigo (
idArtigo int primary key auto_increment,
titulo varchar(45)
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
fkArtigo int,
dataCurtida date,

foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkArtigo) references artigo(idArtigo)
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

-- ("Kin'emon"), ('Denjiro'),('Raizo'),('Shinobu'),('Kawamatsu('Izo('Nekomamushi'),('Kanjuro'),



insert into usuario (nome, email, senha, fkPersonagem) values 
('Fernando Alves', 'fernando@outlook.com', md5('ferdARRO1920#'), 1),
('Clara Fernandes', 'clara.fernandes@outlook.com', md5('#cald.4509_'), 11);

insert into quiz values 
(default, 'Onigashima em Chamas', 'Região de Onigashima, questões englobam o ODS 1 - Erradicação da fome', 10),
(default, 'Kuri Desumana', 'Região de Kuri, questões englobam o ODS 6 - Diminuição das desigualdades', 14);

insert into pontuacao values 
(1, 1, 8),
(1, 2, 5),
(2, 2, 12),
(2, 1, 7);

insert into artigo (titulo) values
('As Desigualdades em Kuri'),
('O que um Imperador faria pelo One Piece?'),
('Trabalho Escravo e Indústrias Poluentes');

insert into curtir values 
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3);


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

SELECT * FROM personagem;
SELECT * FROM usuario;


UPDATE usuario
SET senha = MD5('123456')
WHERE idUsuario = 1;

SELECT * FROM usuario WHERE email = 'joao@.com'  AND senha = MD5('122');
select * from usuario;


 -- INSERT INTO usuario (nome, email, senha, fkPersonagem) VALUES