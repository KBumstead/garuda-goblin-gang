import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Users, DollarSign, PlusCircle, Cake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from './ui/dialog';
import { fetchTrainingPrograms } from '../services/apiClient';

// Backend model fields for TrainingProgram:
// trainer_id, title, description, skill_level, age_range, cost, participant, city
interface TrainingProgram {
  program_id: string;
  trainer_id: string;
  title: string;
  description: string;
  skill_level: string;
  age_range: string;
  cost: number;
  participant: number;
  city: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800';
    case 'Advanced':
      return 'bg-orange-100 text-orange-800';
    case 'Elite':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface TrainingProgramsProps {
  userRole?: 'user' | 'scout' | 'trainer';
}

export function TrainingPrograms({ userRole }: TrainingProgramsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newProgram, setNewProgram] = useState({ title: '', description: '', city: '', cost: '', skill_level: '', age_range: '', participant: '' });
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTrainingPrograms()
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch training programs');
        setLoading(false);
      });
  }, []);

  const handleAddProgram = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProgram({ ...newProgram, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    setModalOpen(false);
    alert('Training program added! (mock)');
  };
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-[#fbfffe]">Training Programs</h1>
        {userRole === 'trainer' && (
          <>
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center gap-2 bg-[#f46036] text-white font-bold px-4 py-2 rounded-lg shadow hover:bg-[#d94e1f] focus:bg-[#d94e1f] focus:outline-none focus:ring-2 focus:ring-[#f46036]/50 transition"
                  onClick={handleAddProgram}
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Training Program
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#fbfffe] rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-[#f46036]">Add Training Program</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <input name="title" value={newProgram.title} onChange={handleInputChange} placeholder="Program Name" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white" />
                  <textarea name="description" value={newProgram.description} onChange={handleInputChange} placeholder="Description" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white min-h-[80px]" />
                  <input name="city" value={newProgram.city} onChange={handleInputChange} placeholder="City" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white" />
                  <input name="cost" value={newProgram.cost} onChange={handleInputChange} placeholder="Cost" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white" />
                  <input name="skill_level" value={newProgram.skill_level} onChange={handleInputChange} placeholder="Skill Level" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white" />
                  <input name="age_range" value={newProgram.age_range} onChange={handleInputChange} placeholder="Age Range" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white" />
                  <input name="participant" value={newProgram.participant} onChange={handleInputChange} placeholder="Participants" className="w-full px-3 py-2 rounded border border-[#6d676e]/30 focus:border-[#f46036] focus:ring-[#f46036] text-[#1b1b1e] bg-white" />
                </div>
                <DialogFooter>
                  <Button className="bg-[#f46036] text-white font-bold px-4 py-2 rounded-lg hover:bg-[#d94e1f]" onClick={handleSave}>Save</Button>
                  <Button variant="outline" className="px-4 py-2 rounded-lg" onClick={handleModalClose}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {loading ? (
        <div className="text-center text-[#f46036] py-8">Loading training programs...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.program_id} className="bg-[#fbfffe] border-[#6d676e]/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-[#1b1b1e] line-clamp-2">
                    {program.title}
                  </CardTitle>
                  <Badge className={getLevelColor(program.skill_level)}>
                    {program.skill_level}
                  </Badge>
                </div>
                {/* You can show trainer or other info here if needed */}
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#1b1b1e] text-sm line-clamp-3">{program.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                    <MapPin className="w-4 h-4" />
                    <span>{program.city}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                    <Cake className="w-4 h-4" />
                    <span>{program.age_range ? `${program.age_range} years` : 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                    <Users className="w-4 h-4" />
                    <span>{program.participant} participants</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6d676e]">
                    <DollarSign className="w-4 h-4" />
                    <span className={program.cost === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {program.cost === 0 ? 'Free' : `Rp ${program.cost.toLocaleString()}`}
                    </span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#f46036] hover:bg-[#f46036]/90 text-white font-medium"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}