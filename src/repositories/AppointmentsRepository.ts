import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointmemt';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    // Find appointment By Date
    public async findbyDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
