//define como ACESSAR essa tabela

package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GastoRepository extends JpaRepository<Gasto, String> {//  "GastoRepository herda tudo que JpaRepository já tem"

}
