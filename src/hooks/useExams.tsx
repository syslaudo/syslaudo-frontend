import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../services/api';
import { isAuthenticated } from '../services/auth';

export interface Exam {
  id: string;
  cpf: string;
  type: string;
  date: Date;
  status: string;
  hypotesis: string;
  image: string;
  report: string;
  report_status: string;
  password?: string;
}

export interface Result {
  cpf: string;
  type: string;
  date: Date;
  status: string;
  hypotesis: string;
  image: string;
  report: string;
  name: string;
}

export interface Recommendation {
  id: string;
  exam: string;
  recommendations: string;
}

type ExamInput = Omit<Exam, 'id'>;

interface ExamsContextData {
  exams: Exam[];
  recommendations: Recommendation[];
  createExam: (examInput: ExamInput) => Promise<void>;
  removeExam: (examId: string) => Promise<void>;
  updateExam: (examId: string, examInput: ExamInput) => Promise<void>;
  getRecommendationByExamType: (examType: string) => string;
  getResult: (cpf: string, password: string) => Promise<Result>;
}

interface ExamsProviderProps {
  children: ReactNode;
}

const ExamsContext = createContext<ExamsContextData>({} as ExamsContextData);

export function ExamsProvider({ children }: ExamsProviderProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function loadExams() {
      const response = await api.get('/exame/listAll');

      const exams = response.data.map(
        (exam: any) =>
          (exam = {
            id: exam.id_exame,
            cpf: exam.cpf,
            type: exam.type,
            date: exam.data_realizacao,
            status: exam.status,
            hypotesis: exam.hipotese,
            image: exam.image,
            report: exam.report,
            report_status: exam.report_status,
            password: exam.senha,
          }),
      );

      setExams(exams);
    }

    async function loadRecommendations() {
      const response = await api.get('/recomendacao/listAll');

      const recommendations = response.data.map(
        (recommendation: any) =>
          (recommendation = {
            id: recommendation.id_recomendacao,
            exam: recommendation.exame,
            recommendations: recommendation.recomendacao,
          }),
      );

      setRecommendations(recommendations);
    }

    if (isAuthenticated) {
      loadExams();
      loadRecommendations();
    }
  }, []);

  async function createExam(examInput: ExamInput) {
    const exam = {
      cpf: examInput.cpf,
      type: examInput.type,
      data_realizacao: examInput.date,
      status: examInput.status,
      hipotese: examInput.hypotesis,
      image: examInput.image,
      report: examInput.report,
      report_status: examInput.report_status,
    };
    const response = await api.post('/exame/create', exam);
    setExams([...exams, response.data]);
  }

  async function removeExam(examId: string) {
    await api.delete(`/exame/delete/${examId}`);

    const examsFiltered = exams.filter((exam) => exam.id !== examId);

    setExams(examsFiltered);
  }

  async function getResult(cpf: string, password: string) {
    const response = await api.post('session/acesso-paciente', {
      cpf,
      senha: password,
    });

    const exam = {
      cpf: response.data.cpf,
      type: response.data.type,
      date: response.data.data_realizacao,
      status: response.data.status,
      hypotesis: response.data.hipotese,
      image: response.data.image,
      report: response.data.report,
      name: response.data.nome,
    };

    return exam;
  }

  async function updateExam(examId: string, examInput: ExamInput) {
    const exam = {
      cpf: examInput.cpf,
      type: examInput.type,
      data_realizacao: examInput.date,
      status: examInput.status,
      hipotese: examInput.hypotesis,
      image: examInput.image,
      report: examInput.report,
      report_status: examInput.report_status,
    };

    const updatedExam = await api.put(`/exame/update/${examId}`, exam);

    const updatedExams = exams.map((exam) =>
      exam.id !== updatedExam.data.id ? exam : updatedExam.data,
    );

    setExams(updatedExams);
  }

  function getRecommendationByExamType(examType: string) {
    const examRecommendation = recommendations.find(
      (recommendation) => recommendation.exam === examType,
    );

    if (!examRecommendation) {
      return '';
    }

    return examRecommendation?.recommendations;
  }

  return (
    <ExamsContext.Provider
      value={{
        exams,
        recommendations,
        createExam,
        removeExam,
        updateExam,
        getRecommendationByExamType,
        getResult,
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
}

export function useExams() {
  return useContext(ExamsContext);
}
