
drop database escuelaEt32;

create database escuelaEt32;
use escuelaEt32;

create table alumnos(
id int(11) auto_increment,
nombres varchar(125),
apellidos varchar(125),
dni int(11),
mail varchar(125),
telefono varchar(15),
passw varchar(22),
verificacion varchar(30) default "Sin verifacion",
primary key(id)
);

create table profesores(
id int(11)auto_increment,
nombres varchar(125),
apellidos varchar(125),
mail varchar(125),
passw varchar(22),
moderation int(1) default 0,
primary key(id)
);

create table notas(
id int(11)auto_increment,
idAlumno int(11),
idProfe int(11),
semestre varchar(50),
nota double(4,2),
materia varchar(125),
fecha date,
primary key(id),
foreign key (idAlumno) references alumnos(id),
foreign key (idProfe) references profesores(id)
);

create table asistencia(
idAlumno int(11),
idProfe int(11),
materia varchar(125),
fechaHora datetime,
puntualidad varchar(50),
foreign key (idAlumno) references alumnos (id),
foreign key (idProfe) references profesores (id)
);

insert into profesores (nombres, apellidos, mail, passw) values("Jose","Alberto","profe@gmail.com","1234");
insert into alumnos (nombres, apellidos, mail, passw, verificacion) values('Martin', 'Mendez', 'alumno@gmail.com', '1234', 'Verificado');
insert into notas (idAlumno, idProfe, nota, materia, fecha) values(1,1, 8.00, 'matematicas', '2024-08-01');
insert into notas (idAlumno, idProfe, nota, materia, fecha) values(1,1, 9.00, 'matematicas', '2024-09-01');
insert into notas (idAlumno, idProfe, nota, materia, fecha) values(1,1, 10.00, 'matematicas', '2024-10-01');
insert into asistencia(idAlumno, idProfe, materia, fechaHora, puntualidad) values(1, 1, 'Geografia', '2025-04-14 18:20:00', 'Puntual');
