import { Box } from '@mui/material';

const GameWhackAMole = () => {
  return (
    <Box>
      <iframe
        style={{
          maxWidth: '100%',
        }}
        src="https://wordwall.net/vi/embed/22b91b68357440819766364faa48bb9a?themeId=23&templateId=45&fontStackId=12"
        width="500"
        height="380"
        frameBorder="0"
        allowFullScreen
      />
    </Box>
  );
};

export default GameWhackAMole;
