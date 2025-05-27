import { useState, useEffect, useMemo } from 'react';
import { useReports } from '../contexts/ReportContext';
import { dateUtils } from '../utils/dateUtils';

export function useMonthlyReports(initialDate = new Date()) {
  const { items: reports, loadItems } = useReports();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      await loadItems();
    } finally {
      setLoading(false);
    }
  };

  const monthlyData = useMemo(() => {
    const { start, end } = dateUtils.getMonthRange(selectedDate);
    
    const monthReports = reports.filter(report => 
      dateUtils.isDateInRange(report.date, start, end)
    );

    const totalDuration = monthReports.reduce((sum, report) => sum + report.duration, 0);
    const totalStudyHours = monthReports.reduce((sum, report) => sum + report.studyHours, 0);
    
    return {
      totalDuration,
      totalStudyHours,
      reports: monthReports,
      formattedMonth: dateUtils.formatMonth(selectedDate)
    };
  }, [reports, selectedDate]);

  const changeMonth = (increment) => {
    setSelectedDate(current => {
      const newDate = new Date(current);
      newDate.setMonth(current.getMonth() + increment);
      return newDate;
    });
  };

  const nextMonth = () => changeMonth(1);
  const previousMonth = () => changeMonth(-1);

  return {
    ...monthlyData,
    loading,
    selectedDate,
    nextMonth,
    previousMonth,
    refresh: loadReports
  };
} 