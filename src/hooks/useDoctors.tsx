import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Doctor {
  id: number;
  cpf: string;
  email: string;
  password: string;
  name: string;
  crm: string;
  type: string;
  date?: Date;
  title?: string;
}

type DoctorInput = Omit<Doctor, "id">;

interface DoctorsContextData {
  doctors: Doctor[];
  createDoctor: (doctorInput: DoctorInput) => Promise<void>;
  removeDoctor: (doctorId: string) => Promise<void>;
  updateDoctor: (doctorId: number, doctorInput: DoctorInput) => Promise<void>;
}

interface DoctorsProviderProps {
  children: ReactNode;
}

const DoctorsContext = createContext<DoctorsContextData>(
  {} as DoctorsContextData
);

export function DoctorsProvider({ children }: DoctorsProviderProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    async function loadDoctors() {
      await api.get("/doctors").then((response) => setDoctors(response.data));
    }

    loadDoctors();
  }, []);

  async function createDoctor(doctorInput: DoctorInput) {
    const response = await api.post("/doctors", doctorInput);
    setDoctors([...doctors, response.data]);
  }

  async function removeDoctor(doctorId: string) {
    await api.delete(`/doctors/${doctorId}`);

    const doctorsFiltered = doctors.filter(
      (doctor) => doctor.id !== Number(doctorId)
    );

    setDoctors(doctorsFiltered);
  }

  async function updateDoctor(doctorId: number, doctorInput: DoctorInput) {
    const updatedDoctor = await api.put(`/doctors/${doctorId}`, {
      ...doctorInput,
      id: doctorId,
    });

    const updatedDoctors = doctors.map((doctor) =>
      doctor.id !== updatedDoctor.data.id ? doctor : updatedDoctor.data
    );

    setDoctors(updatedDoctors);
  }

  return (
    <DoctorsContext.Provider
      value={{ doctors, createDoctor, removeDoctor, updateDoctor }}
    >
      {children}
    </DoctorsContext.Provider>
  );
}

export function useDoctors() {
  return useContext(DoctorsContext);
}
