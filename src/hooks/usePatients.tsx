import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Patient {
  id: number;
  cpf: string;
  name: string;
  sex: string;
  race: string;
  birth: Date;
}

type PatientInput = Omit<Patient, "id">;

interface PatientsContextData {
  patients: Patient[];
  createPatient: (patientInput: PatientInput) => Promise<void>;
  removePatient: (patientId: string) => Promise<void>;
  updatePatient: (
    patientId: number,
    patientInput: PatientInput
  ) => Promise<void>;
}

interface PatientsProviderProps {
  children: ReactNode;
}

const PatientsContext = createContext<PatientsContextData>(
  {} as PatientsContextData
);

export function PatientsProvider({ children }: PatientsProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function loadPatients() {
      await api.get("/patients").then((response) => setPatients(response.data));
    }

    loadPatients();
  }, []);

  async function createPatient(patientInput: PatientInput) {
    const response = await api.post("/patients", patientInput);
    setPatients([...patients, response.data]);
  }

  async function removePatient(patientId: string) {
    await api.delete(`/patients/${patientId}`);

    const patientsFiltered = patients.filter(
      (patient) => patient.id !== Number(patientId)
    );

    setPatients(patientsFiltered);
  }

  async function updatePatient(patientId: number, patientInput: PatientInput) {
    const updatedPatient = await api.put(`/patients/${patientId}`, {
      ...patientInput,
      id: patientId,
    });

    const updatedPatients = patients.map((patient) =>
      patient.id !== updatedPatient.data.id ? patient : updatedPatient.data
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
