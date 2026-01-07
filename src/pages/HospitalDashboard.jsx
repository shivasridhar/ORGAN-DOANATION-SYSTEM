import React, { useState } from 'react';
import { Users, Activity, Filter, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import Card from '../components/Card';
import SearchFilters from '../components/SearchFilters';
import DonorRow from '../components/DonorRow';
import Modal from '../components/Modal';
import Button from '../components/Button';

const HospitalDashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrgan, setFilterOrgan] = useState('all');
  const [filterBlood, setFilterBlood] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedDonor, setSelectedDonor] = useState(null);

  const donors = [
    { id: 1, name: 'John Smith', bloodType: 'A+', organ: 'Kidney', location: 'New York', status: 'Available', matchScore: 95 },
    { id: 2, name: 'Sarah Johnson', bloodType: 'O-', organ: 'Liver', location: 'California', status: 'Available', matchScore: 88 },
    { id: 3, name: 'Michael Brown', bloodType: 'B+', organ: 'Heart', location: 'Texas', status: 'Available', matchScore: 92 },
    { id: 4, name: 'Emily Davis', bloodType: 'AB+', organ: 'Lung', location: 'Florida', status: 'Available', matchScore: 85 },
  ];

  const filteredDonors = donors
    .filter(d => filterOrgan === 'all' || d.organ.toLowerCase() === filterOrgan)
    .filter(d => filterBlood === 'all' || d.bloodType === filterBlood)
    .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'match' ? b.matchScore - a.matchScore : 0);

  const filterConfig = [
    {
      name: 'organ',
      value: filterOrgan,
      options: [
        { value: 'all', label: 'All Organs' },
        { value: 'kidney', label: 'Kidney' },
        { value: 'liver', label: 'Liver' },
        { value: 'heart', label: 'Heart' },
        { value: 'lung', label: 'Lung' }
      ]
    },
    {
      name: 'blood',
      value: filterBlood,
      options: [
        { value: 'all', label: 'All Blood Types' },
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'O-', label: 'O-' }
      ]
    }
  ];

  const handleFilterChange = (name, value) => {
    if (name === 'organ') setFilterOrgan(value);
    if (name === 'blood') setFilterBlood(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D4E8E8] via-[#A2BFC6] to-[#798E93]">
      <AnimatedBackground />
      <Navbar user={user} onLogout={logout} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Available Donors', value: '248', icon: Users, color: 'red-600' },
            { label: 'Active Matches', value: '12', icon: Activity, color: '[#556B73]' },
            { label: 'Pending Requests', value: '5', icon: Filter, color: '[#798E93]' },
            { label: 'Success Rate', value: '94%', icon: Heart, color: 'red-600' }
          ].map((stat, index) => (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#798E93] text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2C3E44] mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-12 h-12 text-${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filterConfig}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <Card className="mt-8 p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/40 border-b border-[#798E93]/30">
                <tr>
                  {['Donor', 'Blood Type', 'Organ', 'Location', 'Match Score', 'Status', 'Actions'].map(header => (
                    <th key={header} className="px-6 py-4 text-left text-[#2C3E44] font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map(donor => (
                  <DonorRow key={donor.id} donor={donor} onView={setSelectedDonor} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {selectedDonor && (
        <Modal isOpen={true} onClose={() => setSelectedDonor(null)} title="Donor Profile" size="md">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {[
              { label: 'Name', value: selectedDonor.name },
              { label: 'Blood Type', value: selectedDonor.bloodType },
              { label: 'Organ', value: selectedDonor.organ },
              { label: 'Location', value: selectedDonor.location },
              { label: 'Match Score', value: `${selectedDonor.matchScore}%`, special: 'red' },
              { label: 'Status', value: selectedDonor.status, special: 'green' }
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-[#556B73] mb-2 font-medium">{field.label}</label>
                <div className={`bg-white/50 border rounded-lg px-4 py-3 ${
                  field.special === 'red' ? 'text-red-600 font-bold border-[#798E93]/30' :
                  field.special === 'green' ? 'bg-green-600/20 border-green-600/50 text-green-700 font-semibold' :
                  'text-[#2C3E44] border-[#798E93]/30'
                }`}>
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <Button variant="primary" className="flex-1">Request Match</Button>
            <Button variant="secondary" className="flex-1">Contact Donor</Button>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default HospitalDashboard;
