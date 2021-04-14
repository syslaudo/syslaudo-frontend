import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { isAuthenticated } from '../services/Auth';

interface Patient {
  id: string;
  cpf: string;
  nome_paciente: string;
  sexo_paciente: string;
  cor_paciente: string;
  datanasc_paciente: Date;
}

type PatientInput = Omit<Patient, 'id'>;

interface PatientsContextData {
  patients: Patient[];
  createPatient: (patientInput: PatientInput) => Promise<void>;
  removePatient: (patientId: string) => Promise<void>;
  updatePatient: (
    patientId: string,
    patientInput: PatientInput,
  ) => Promise<void>;
}

interface PatientsProviderProps {
  children: ReactNode;
}

const PatientsContext = createContext<PatientsContextData>(
  {} as PatientsContextData,
);

export function PatientsProvider({ children }: PatientsProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function loadPatients() {
      const response = await api.get('/paciente/listAll');
      console.log(response);

      const patients = response.data.map(
        (patient: any) =>
          (patient = {
            id: patient.id_paciente,
            cpf: patient.cpf,
            nome_paciente: patient.nome_paciente,
            sexo_paciente: patient.sexo_paciente,
            cor_paciente: patient.cor_paciente,
            datanasc_paciente: patient.datanasc_paciente,
          }),
      );

      setPatients(patients);
    }

    if (isAuthenticated()) {
      loadPatients();
    }
  }, []);

  async function createPatient(patientInput: PatientInput) {
    const response = await api.post('/paciente/create', {
      ...patientInput,
      aguardando_realizacao: false,
    });
    setPatients([...patients, response.data]);
  }

  async function removePatient(patientId: string) {
    await api.delete(`/paciente/delete/${patientId}`);

    const patientsFiltered = patients.filter(
      (patient) => patient.id !== patientId,
    );

    setPatients(patientsFiltered);
  }

  async function updatePatient(patientId: string, patientInput: PatientInput) {
    const updatedPatient = await api.put(`/paciente/update/${patientId}`, {
      ...patientInput,
      aguardando_realizacao: false,
    });

    const updatedPatients = patients.map((patient) =>
      patient.id !== updatedPatient.data.id ? patient : updatedPatient.data,
    );

    setPatients(updatedPatients);
  }

  return (
    <PatientsContext.Provider
      value={{ patients, createPatient, removePatient, updatePatient }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients() {
  return useContext(PatientsContext);
}
