import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home({ token }) {
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get('https://massielrojas3227-001-site1.dtempurl.com/Curso/matriculados', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get('https://massielrojas3227-001-site1.dtempurl.com/Curso/disponibles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableCourses(response.data);
    } catch (error) {
      console.error('Error fetching available courses:', error);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
    fetchAvailableCourses();
  }, [token]);

  const handleEnroll = async () => {
    if (!selectedCourse) return;

    try {
      await axios.post(`https://massielrojas3227-001-site1.dtempurl.com/Curso/matricular/${selectedCourse}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEnrolledCourses();
      setShowModal(false);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await axios.post(`https://massielrojas3227-001-site1.dtempurl.com/Curso/desmatricular/${courseId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEnrolledCourses();
    } catch (error) {
      console.error('Error unenrolling from course:', error);
    }
  };

  return (
    <div>
      <h2>UCR Occidente</h2>
      <button className="enroll-button" onClick={() => setShowModal(true)}>Matricular Curso</button>
      {showModal && (
        <div className="modal">
          <h2>Matricular Curso</h2>
          <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
            <option value="">Seleccione un curso</option>
            {availableCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.nombre}
              </option>
            ))}
          </select>
          <button className="enroll-button" onClick={handleEnroll}>Matricular</button>
          <button className="close-modal" onClick={() => setShowModal(false)}>Cerrar</button>
        </div>
      )}
      <h3>Cursos Matriculados</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre del Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.nombre}</td>
              <td>
                <button className="unenroll-button" onClick={() => handleUnenroll(course.id)}>Desmatricular</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
