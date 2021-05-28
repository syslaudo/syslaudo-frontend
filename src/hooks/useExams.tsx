import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { dummyApi as api } from '../services/dummyApi';
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
      const response = await api.get('/exams');

      const exams = response.data.map(
        (exam: Exam) =>
          (exam = {
            id: exam.id,
            cpf: exam.cpf,
            type: exam.type,
            date: exam.date,
            status: exam.status,
            hypotesis: exam.hypotesis,
            image: exam.image,
            report: exam.report,
            report_status: exam.report_status,
          }),
      );

      setExams(exams);
    }

    async function loadRecommendations() {
      const response = await api.get('/recommendations');

      const recommendations = response.data.map(
        (recommendation: Recommendation) =>
          (recommendation = {
            id: recommendation.id,
            exam: recommendation.exam,
            recommendations: recommendation.recommendations,
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
      date: examInput.date,
      status: examInput.status,
      hypotesis: examInput.hypotesis,
      image: examInput.image,
      report: examInput.report,
      report_status: examInput.report_status,
    };
    const response = await api.post('/exams', exam);
    setExams([...exams, response.data]);
  }

  async function removeExam(examId: string) {
    await api.delete(`/exams/${examId}`);

    const examsFiltered = exams.filter((exam) => exam.id !== examId);

    setExams(examsFiltered);
  }

  async function updateExam(examId: string, examInput: ExamInput) {
    const exam = {
      cpf: examInput.cpf,
      type: examInput.type,
      date: examInput.date,
      status: examInput.status,
      hypotesis: examInput.hypotesis,
      image: examInput.image,
      report: examInput.report,
      report_status: examInput.report_status,
    };

    const updatedExam = await api.put(`/exams/${examId}`, exam);

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
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
}

export function useExams() {
  return useContext(ExamsContext);
}
