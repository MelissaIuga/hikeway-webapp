import Bear from '../images/bear.svg';

export default function BearClubPage() {
    return (
        <section className='page'>
            <div className='welcomebear'>
                <img id="largeclublogo" src={Bear} alt="Bear Club logo" />

                <div className='bearclubtext'>
                    <h1>Bear Club</h1>
                    <p>Advanced hikers</p>
                </div>
            </div>

            <div className='groups'>
                <h2>Nearby groups to join</h2>
            </div>
        </section>
    );
}