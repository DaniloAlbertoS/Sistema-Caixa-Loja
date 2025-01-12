    package com.sistemacaixaloja.sistemacaixaloja.repositories;

    import com.sistemacaixaloja.sistemacaixaloja.models.Financeiro;

    import java.util.Optional;

    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    @Repository
    public interface FinanceiroRepository extends JpaRepository<Financeiro, Integer> {
        Financeiro findByMatriculaAndCpf(int matricula, String cpf);

        Optional<Financeiro> findByMatricula(int matricula);

        boolean existsByMatricula(int matricula);
    }
