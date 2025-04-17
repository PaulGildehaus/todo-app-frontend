
export const authStyles = {
    rootContainer: {
      mt: 8,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    googleButton: (theme) => ({
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
      py: 1.5,
      mb: 2,
    }),
    logoutButton: {
        position: 'absolute',
        right: { xs: 8, sm: 16, md: 24 },
        top: { xs: 2, sm: 4, md: 6 },
        bgcolor: 'rgba(9, 118, 228, 0.5)',
        color: 'white',
        '&:hover': {
        bgcolor: 'rgba(9, 118, 228, 0.8)',
        },
    }
};