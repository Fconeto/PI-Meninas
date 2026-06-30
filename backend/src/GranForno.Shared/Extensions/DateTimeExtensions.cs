namespace GranForno.Shared.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime ToBrazilTime(this DateTime utcDateTime)
        {
            var tz = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, tz);
        }
    }
}
