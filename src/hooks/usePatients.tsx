import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { isAuthenticated } from '../services/auth';

interface Patient {
  id: string;
  cpf: string;
  name: string;
  sex: string;
  race: string;
  birthdate: Date;
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
  findPatientByCpf: (cpf: string) => Patient | undefined;
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

      const patients = response.data.map(
        (patient: any) =>
          (patient = {
            id: patient.id_paciente,
            cpf: patient.cpf,
            name: patient.nome_paciente,
            sex: patient.sexo_paciente,
            race: patient.cor_paciente,
            birthdate: patient.datanasc_paciente,
          }),
      );

      setPatients(patients);
    }

    if (isAuthenticated) {
      loadPatients();
    };
  }, []);

  async function createPatient(patientInput: PatientInput) {
    const patient = {
      cpf: patientInput.cpf,
      nome_paciente: patientInput.name,
      sexo_paciente: patientInput.sex,
      cor_paciente: patientInput.race,
      datanasc_paciente: patientInput.birthdate,
      aguarda_realizacao: false,
    };

    const response = await api.post('/paciente/create', patient);
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
    const patient = {
      cpf: patientInput.cpf,
      nome_paciente: patientInput.name,
      sexo_paciente: patientInput.sex,
      cor_paciente: patientInput.race,
      datanasc_paciente: patientInput.birthdate,
      aguarda_realizacao: false,
    };

    const updatedPatient = await api.put(
      `/paciente/update/${patientId}`,
      patient,
    );

    const updatedPatients = patients.map((patient) =>
      patient.id !== updatedPatient.data.id ? patient : updatedPatient.data,
    );

    setPatients(updatedPatients);
  }

  function findPatientByCpf(cpf: string) {
    return patients.find(patient => patient.cpf === cpf);
  }

  return (
    <PatientsContext.Provider
      value={{ patients, createPatient, removePatient, updatePatient, findPatientByCpf }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export function usePatients() {
  return useContext(PatientsContext);
}
