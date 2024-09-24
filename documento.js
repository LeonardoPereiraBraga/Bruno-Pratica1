const mysql2 = require('mysql2');


const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',  
    password: 'fatec123', 
    database: 'aluno'      
});


connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});


const gravarAluno = (nome, email) => {
    const aluno = { nome: nome, email: email };
    const query = 'INSERT INTO aluno SET ?';

    connection.query(query, aluno, (err, results) => {
        if (err) {
            console.error('Erro ao gravar aluno:', err);
            return;
        }
        console.log('Aluno gravado com ID:', results.insertId);
    });
};


const buscarAlunos = () => {
    const query = 'SELECT id, nome, email FROM aluno';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar alunos:', err);
            return;
        }
        results.forEach(aluno => {
            console.log(`ID: ${aluno.id}, Nome: ${aluno.nome}, Email: ${aluno.email}`);
        });
    });
};

module.exports = {
    gravarAluno,
    buscarAlunos
};

// Teste
gravarAluno('Carlos Eduardo', 'carlos@example.com');
buscarAlunos();
