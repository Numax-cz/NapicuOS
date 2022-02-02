import {Informations} from '../interface/Informations';
import {lang} from './BiosMenu';

export function MainInfo(): Informations[] {
    return [
        {
            title: lang.MainInfoTitle.cpu_type,
            value: 'AMD Celeron (tm) II B45 Processor @ 2.6 GHz (64bit)',
        },
        {
            title: lang.MainInfoTitle.cpu_speed,
            value: '2666MHz',
        },
        {
            title: lang.MainInfoTitle.cache_size,
            value: '8192KB',
        },
        {
            title: lang.MainInfoTitle.memory_size,
            value: '8192MB',
        },
        {
            title: lang.MainInfoTitle.se_number,
            value: 'HRV54JFKD54FJ34FJfj333',
        },
    ];
}
